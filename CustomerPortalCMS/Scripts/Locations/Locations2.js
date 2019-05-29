var valid = false;var filteredLocationServiceModel
var longLat = {};
var searchByZip = true;
var searchByCityState = false;
longLat.Longitute = 0;
longLat.Latitude = 0;
var filteredLocationServiceModel = {};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

$(function() {

    InitializeDistOrInstServicesList("dist");
    //InitializeDistOrInstServicesList("inst");
    InitializeFilteredLocationServiceModel();
    RegisterSearchByChangeEvent()
    
    var mzip = localStorage.getItem('mainZipCode'); //zipCode box from Master layout
    if (mzip != null && mzip != undefined && mzip != "") {
        filteredLocationServiceModel.ZipCode = localStorage.getItem('mainZipCode');
        getLatitudeLongitudeFromAddress(
            function (result) {
                filteredLocationServiceModel.Longitude = result.geometry.location.lng();
                filteredLocationServiceModel.Latitude = result.geometry.location.lat();
                InitializeLocations(filteredLocationServiceModel);
                localStorage.setItem('mainZipCode', '');
                registerButtonEvent();
            },
            mzip
        )
    }
    else {
        zipCode = null;
        InitializeLocations(filteredLocationServiceModel);
        localStorage.setItem('mainZipCode', '');
        registerButtonEvent();
    }
    
    $("#TxtZipCod").keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $('#BtnSearch').click();
        }
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }
    });

    $(".fa-plus").click(function () {
        $(this).prev().click();
    });
    //$("div[id^=DataLst]").click(function () {
    //    $(this).parent().parent().children("div[id^=state]").css("display", "inline-block");
    //});
});

function RegisterSearchByChangeEvent() {
    // use this code block if radio buttons used for zip and city/state
    $('input[type=radio][name=searchBy]').change(function () {
        if (this.value == 'Zip') {
            $("#TxtZipCod").prop("disabled", false);
            $("#TxtCity").prop("disabled", true)
            $("#ddlState").prop("disabled", true);
            searchByZip = true;
            searchByCityState = false; 
        }
        else if (this.value == 'byCityAndState') {
            $("#TxtZipCod").prop("disabled", true);
            $("#TxtCity").prop("disabled", false)
            $("#ddlState").prop("disabled", false);
            searchByZip = false;
            searchByCityState = true; 
        }
    });
}

function registerButtonEvent() {
    $('#BtnResetMap').on('click', function (e) {
        //console.log(longLat);
        e.preventDefault();
        $('#TxtZipCod').val('');
        $('#TxtCity').val('');
        $('#ddlState').val(0);
        $('input[type=checkbox]').each(function () {
            this.checked = false;
        });
        //Initialize();
        InitializeFilteredLocationServiceModel();
        InitializeLocations(filteredLocationServiceModel); 
    });

    $('#BtnSearch').on('click', function (event) {
       
        event.preventDefault();
        var filteredLocationServiceModel = {};
        filteredLocationServiceModel.Radius = 150;
        if ($("#TxtZipCod").val().length != 0 && $('#TxtZipCod').val().length != 5) {
            alert("Only 5 digit zip codes valid!");
            return;
        } else {
            var zipCode = $('#TxtZipCod').val(); // could also be ''
        }
        var city = $('#TxtCity').val().trim();
        var state = $('#ddlState').val() != 0 ? $('#ddlState option:selected').text().trim().slice(2) : "";
        if (city.trim() === "" && zipCode.trim() === "" && state.trim() !== "")
        {
            alert("Zip Code or City must be specified.");
            return;
        }
        var checkboxes1 = [];
        var checkboxes2 = [];
        $("#divDistributions input[type=checkbox]").each(function () {
            if (this.checked) {
                checkboxes1.push({ "alias": this.id, "name": $(this).parent().find('label').text().trim(), "key": "#divDistributions #" + this.id });
            }
        });
        $("#divInstallServices input[type=checkbox]").each(function () {
            if (this.checked) {
                checkboxes2.push({ "alias": this.id, "name": $(this).parent().find('label').text().trim(), "key": "#divInstallServices #" + this.id });
            }
        });
        filteredLocationServiceModel.DistributionList = checkboxes1;
        filteredLocationServiceModel.InstalledServiceList = checkboxes2;
        //var address = searchByZip ? zipCode : city + ', ' + state; //use this if radio buttons for zip and city/state are used.
        var address = zipCode || city + (state != '' ? ', ' + state: ''); //dfdf
        //console.log(address)

        var restoredata = {};
        restoredata.city = city;
        restoredata.state = $('#ddlState').val();
        restoredata.zipcode = zipCode;
        restoredata.checkboxes1 = checkboxes1;
        restoredata.checkboxes2 = checkboxes2;

        if (backButton != null) {
            var additionaldata = backButton.additionalData();
            if (additionaldata == null)
                additionaldata = {};
            additionaldata.restoredata = restoredata;
            backButton.updateData(additionaldata);
        }

        if (address == '') { //call api for locations etc
            filteredLocationServiceModel.Longitude = 0;
            filteredLocationServiceModel.Latitude = 0;
            InitializeLocations(filteredLocationServiceModel);            
        } else { // get lat and long coords and call api for locations etc
            getLatitudeLongitudeFromAddress(
                function (result) {
                    filteredLocationServiceModel.Longitude = result.geometry.location.lng();
                    filteredLocationServiceModel.Latitude = result.geometry.location.lat();
                    //console.log(filteredLocationServiceModel.Longitude);
                    InitializeLocations(filteredLocationServiceModel);
                },
                address
            )
        }
    });
}

function InitializeLocations(filteredLocationServiceModel) {
    $.ajax({
        type: "POST",
        data: JSON.stringify(filteredLocationServiceModel),
        url: "/umbraco/api/LocationData/GetAllfilteredLocations",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (data, status, jqXHR) {
            if (data.length > 0) {
                InitializeMap(data);
                FilterLocationList(GetStatwiseData(data));
            }
            else {
                var r = confirm('No results found for provided filters');
                if (r == true) {
                    Initialize();
                    var filteredLocationServiceModel = {};
                    InitializeFilteredLocationServiceModel();
                    $('#TxtZipCod').val('');
                    $('#TxtCity').val('');
                    $('#ddlState').val(0);
                    $('input[type=checkbox]').each(function () {
                        this.checked = false;
                    });
                }
            }
        },
        error: function (xhr) {
        }
    });
}
function InitializeStateTable(locationsList) {
    $.ajax({
        type: "POST",
        data: JSON.stringify(locationsList),
        url: "/umbraco/api/LocationData/FetchOrderedStateList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: true,
        success: function (data, status, jqXHR) {
            if (data.length > 0) {
                FilterLocationList(data);
            }
        },
        error: function (xhr) {
            //console.log(xhr)
        }
    });
}
function getLatitudeLongitudeFromAddress(callback, address) {
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address || '75021'
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
            else {
                alert("Sorry but there are no search results at this time.");
            }
        });
    }
}
// init for first load(map)
function Initialize() {
    $.ajax({
        url: '/umbraco/api/LocationData/GetAll/',
        method: 'GET',
        success: function (result) {
            InitializeMap(result);
        }
    });
}
function InitializeMap(data) {
    if (data.length > 0) {
        if (backButton != null) {
            var additionaldata = backButton.additionalData();
            if (additionaldata == null)
                additionaldata = {};
            additionaldata.mapData = data;
            backButton.updateData(additionaldata);
        }

        var mapOptions = {
            maxZoom: 15,
            center: new google.maps.LatLng(37.09024, -95.712891),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var gm = google.maps;
        var map = new gm.Map(document.getElementById('map_device'), mapOptions);

        var iw = new gm.InfoWindow();
        var oms = new OverlappingMarkerSpiderfier(map,
            { markersWontMove: true, markersWontHide: true });

        var usualColor = 'FF776B';
        var spiderfiedColor = 'ffee22';
        var iconWithColor = function (color) {
            return 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|+|' +
                color + '|000000|ffff00';
        }
        var shadow = new gm.MarkerImage(
            'https://www.google.com/intl/en_ALL/mapfiles/shadow50.png',
            new gm.Size(37, 34),
            new gm.Point(0, 0),
            new gm.Point(10, 34)
        );

        oms.addListener('click', function (marker) {
            iw.setContent(marker.desc);
            iw.open(map, marker);
        });
        oms.addListener('spiderfy', function (markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon(iconWithColor(spiderfiedColor));
                markers[i].setShadow(null);
            }
            iw.close();
            oms.keepSpiderfied = true;
        });
        oms.addListener('unspiderfy', function (markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon(iconWithColor(usualColor));
                markers[i].setShadow(shadow);
            }
        });
        var bounds = new google.maps.LatLngBounds();

        var bounds = new gm.LatLngBounds();
        for (var i = 0; i < data.length; i++) {
            var me = data[i];
            var loc = new gm.LatLng(me.Latitude, me.Longitude);
            bounds.extend(loc);
            var marker = new gm.Marker({
                position: loc,
                title: me.Address1 + '\n' +
                me.City + ' ' +
                me.State + ' ' +
                me.ZipCode,
                map: map,
                icon: iconWithColor(usualColor),
                shadow: shadow
            });
            var desc = '<div class="info-window">' +
                '<h3>' + me.Name + '</h3>' +
                '<div class="info-content">' +
                '<p>' + me.Address1 + '<br/>' +
                me.City + ' ' +
                me.State + ' ' +
                me.ZipCode + '<br/>' +
                me.PhoneNo + '</p>' +
                '</div>' +
                '<div>' +
                '<a id=' + me.Id + ' href=' +
                me.Url + ' class="link">View Details</a>';
            '</div>'
            '</div>';
            marker.desc = desc;
            oms.addMarker(marker);
        }
        map.fitBounds(bounds);
    }
}
// set all location list on filtered data
function FilterLocationList(data) {
    //console.log(data)
    if (data != undefined && data.length > 0) {
        $('#trMltiData').empty();
        $.each(data, function (index, val) {

            if (val.State != null && val != undefined) {
                var item1 = '<li>';
                item1 = item1 + '<h2><span id="DataLstState_LblState_0">' + val.State + '</span></h2>';
                item1 = item1 + '<div>';
                $.each(val.locations, function (index, val) {
                    item1 = item1 + '<a id=' + val.Id + ' href=' + val.Url + ' class="link">' + val.Name + '</a>';
                });
                item1 = item1 + '</div>';
                item1 = item1 + '</li>';
                $('#trMltiData').append(item1);
            }
        });
    }
}
function InitializeFilteredLocationServiceModel() {
    filteredLocationServiceModel.ZipCode = null;
    filteredLocationServiceModel.Longitude = null;
    filteredLocationServiceModel.Latitude = null;
    filteredLocationServiceModel.City = null;
    filteredLocationServiceModel.State = null;
    filteredLocationServiceModel.Radius = 150;
    filteredLocationServiceModel.DistributionList = null;
    filteredLocationServiceModel.InstalledServiceList = null;
}
function InitializeDistOrInstServicesList(distOrInstall) {
    if (distOrInstall == "dist") {
        apiEndPoint = 'GetDistributionList?forPage=MainLocationsPage';
        div = "#divDistributions";
    } else {
        apiEndPoint = "GetInstalledServiceList?forPage=MainLocationsPage";
        div = "#divInstallServices";
    }
    $.ajax({
        url: '/umbraco/api/LocationData/' + apiEndPoint,
        method: 'GET',
        success: function (result) {
            var mydata = [];
            var mydiv = $('#divDistributions1').find("#divDistributions");
            for (var i = 0; i < result.length; i++) {
                mydata.push(result[i]);
            }
            if (mydata.length > 0) {
                addCheckboxToRow(mydata, div );
            }
            if (distOrInstall == "inst") return;
            InitializeDistOrInstServicesList("inst")
        }
    });
}

function addCheckboxToRow(checkboxes, containerid) {
    var toAppend = "", id = "";
    for (var i = 0; i <= checkboxes.length; i++) {
        if (checkboxes[i] != null) {
            id = checkboxes[i].Alias || checkboxes[i].Name;
            mycol = '<div class="col-sm-3 col-xs-6" style="display: block;"> <input style="display: inline;" type="checkbox" name="checkbox-' + checkboxes[i].Id + '" id="' + id + '" class="custom" > <label for = "' + id + '" style="display: inline;"> &nbsp;' + formatForLabel(checkboxes[i].Name) + '</label></div>';
            toAppend += mycol;
        }
    }
    $(containerid).append(toAppend);
}

function formatForLabel(str) {
    if (str.length > 25) { return str.substr(0, 23) + '...'; } else { return str; }  
}
// init for first load(map)
function Initialize() {
    $.ajax({
        url: '/umbraco/api/LocationData/GetAll/',
        method: 'GET',
        success: function (result) {
            InitializeMap(result);
        }
    });
}
function InitializeMap(data) {
    if (data.length > 0) {
        if (backButton != null) {
            var additionaldata = backButton.additionalData();
            if (additionaldata == null)
                additionaldata = {};
            additionaldata.mapData = data;
            backButton.updateData(additionaldata);
        }

        var mapOptions = {
            maxZoom: 15,
            center: new google.maps.LatLng(37.09024, -95.712891),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var gm = google.maps;
        var map = new gm.Map(document.getElementById('map_device'), mapOptions);

        var iw = new gm.InfoWindow();
        var oms = new OverlappingMarkerSpiderfier(map,
            { markersWontMove: true, markersWontHide: true });

        var usualColor = 'FF776B';
        var spiderfiedColor = 'ffee22';
        var iconWithColor = function (color) {
            return 'https://chart.googleapis.com/chart?chst=d_map_xpin_letter&chld=pin|+|' +
                color + '|000000|ffff00';
        }
        var shadow = new gm.MarkerImage(
            'https://www.google.com/intl/en_ALL/mapfiles/shadow50.png',
            new gm.Size(37, 34),
            new gm.Point(0, 0),
            new gm.Point(10, 34)
        );

        oms.addListener('click', function (marker) {
            iw.setContent(marker.desc);
            iw.open(map, marker);
        });
        oms.addListener('spiderfy', function (markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon(iconWithColor(spiderfiedColor));
                markers[i].setShadow(null);
            }
            iw.close();
            oms.keepSpiderfied = true;
        });
        oms.addListener('unspiderfy', function (markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setIcon(iconWithColor(usualColor));
                markers[i].setShadow(shadow);
            }
        });
        var bounds = new google.maps.LatLngBounds();

        var bounds = new gm.LatLngBounds();
        for (var i = 0; i < data.length; i++) {
            var me = data[i];
            var loc = new gm.LatLng(me.Latitude, me.Longitude);
            bounds.extend(loc);
            var marker = new gm.Marker({
                position: loc,
                title: me.Address1 + '\n' +
                me.City + ' ' +
                me.State + ' ' +
                me.ZipCode,
                map: map,
                icon: iconWithColor(usualColor),
                shadow: shadow
            });
            var desc = '<div class="info-window">' +
                '<h3>' + me.Name + '</h3>' +
                '<div class="info-content">' +
                '<p>' + me.Address1 + '<br/>' +
                me.City + ' ' +
                me.State + ' ' +
                me.ZipCode + '<br/>' +
                me.PhoneNo + '</p>' +
                '</div>' +
                '<div>' +
                '<a id=' + me.Id + ' href=' +
                me.Url + ' class="link">View Details</a>';
            '</div>'
            '</div>';
            marker.desc = desc;
            oms.addMarker(marker);
        }
        map.fitBounds(bounds);
    }
}
// set all location list on filtered data
function FilterLocationList(data) {
    //console.log(data)
    if (data != undefined && data.length > 0) {
        $('#trMltiData').empty();
        c = 0;
        $.each(data, function (index, val) {
            if (val.State != null && val != undefined) {
                if ($(window).width() > 720) {
                    collapseValue = " in"
            } else collapseValue = "";
                var item1 = '<li><a> <div class="col-xs-12">';
                item1 = item1 + '<h2><div class="col-xs-9" style="font-weight:600; cursor:pointer;" id="DataLstState_LblState_' + c +'" ';
                item1 = item1 + ' onClick="stateClickSetter(this, \'' + val.State.replaceAll(" ", "") + '\')" >' + val.State + '</div>' //data-toggle="collapse" data-target="#state
                if ($(window).width() < 721) item1 = item1 + '<div class="col-xs-3 pull-right fa fa-plus" onClick="$(this).prev().click()"></div><h2>';
                item1 = item1 + '</div></a><div id="state' + val.State.replaceAll(" ", "") + '">'; // + '" class="collapse' + collapseValue + '">';
                $.each(val.locationList, function (index, val) {
                    item1 = item1 + '<a id=' + val.Id + ' href=' + val.Url + ' class="link">' + val.Name + '</a>';
                });
                item1 = item1 + '</div>';
                item1 = item1 + '</li>';
                $('#trMltiData').append(item1);
            }
            c++;
        });
    }
}
function stateClickSetter(el, state) {
    //console.log(el);
    if ($(el).hasClass("expanded")) {
        $(el).removeClass("expanded");
        $("#state" + state).css("display", "none");
        $(el).next().removeClass("fa-minus").addClass("fa-plus");
    } else {
        $(el).addClass("expanded");
        $("#state" + state).css("display", "inline-block");
        $(el).next().removeClass("fa-plus").addClass("fa-minus");
    }
}

function InitializeFilteredLocationServiceModel() {
    filteredLocationServiceModel.ZipCode = null;
    filteredLocationServiceModel.Longitude = null;
    filteredLocationServiceModel.Latitude = null;
    filteredLocationServiceModel.City = null;
    filteredLocationServiceModel.State = null;
    filteredLocationServiceModel.Radius = 150;
    filteredLocationServiceModel.DistributionList = null;
    filteredLocationServiceModel.InstalledServiceList = null;
}
function GetStatwiseData(locationsList) {
    var locationDataList = [];
    var locationsList = locationsList.sort(function (a, b) { return (a.Name < b.Name) ? -1 : 1 }).groupBy("State");
    for (var data in locationsList) {
        locationDataList.push({ State: data, locationList: locationsList[data] });
    }
    return locationDataList.sort(function (a, b) { return (a.State < b.State) ? -1 : 1 });
}

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {})

}




