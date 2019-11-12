import React from "react";
import { globalVar } from "../config";
import playBtn from "../img/play-button.png";

class HomeSlider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bannerItems: [],
			currentBannerItem: {},
			showLoader: false,
			showVideo: false,
		};

		this.setupView = this.setupView.bind(this);
		this.playVideo = this.playVideo.bind(this);
	}

	playVideo = () => {};

	setupView = () => {
		//Get raw home data
		let homeData = this.props.homeData[0];

		//Load bannerData on first render
		if (homeData && this.state.bannerItems.length === 0) {
			let bannerItems = [];

			//Get video data from homeData and push into array
			for (let i = 1; i <= 4; i++) {
				var bannerItem = {
					label: homeData[`feature${i}Label`],
					thumbnail: globalVar.base_url1 + homeData[`feature${i}Thumbnail`],
					image: globalVar.base_url1 + homeData[`feature${i}VideoImage`],
					videoLink: homeData[`feature${i}VideoLink`],
				};

				bannerItems.push(bannerItem);
			}

			//Push banner items into state
			this.setState({
				bannerItems: bannerItems,
				currentBannerItem: bannerItems[0],
			});
		}
	};

	render() {
		this.setupView();

		return (
			<div>
				<div className="container hme_slider video-option p-0 banneranimate">
					<div className="home_slid_left">
						{this.state.currentBannerItem && (
							<div className="bannerSlide position-relative">
								<img
									alt="backimage"
									className="back-image d-none d-md-block"
									src={this.state.currentBannerItem.thumbnail}
								/>

								<div
									className={`imagepart ${
										this.state.showVideo ? "hideele" : "showele"
									}`}
								>
									<img
										className="imagepart showele"
										src={this.state.currentBannerItem.image}
										alt="sliderimage"
									/>
									<div className="w-100 h-100 position-absolute  play-button-banner text-center">
										{this.state.showLoader ? null : (
											<img
												className="img-fluid play-button-img"
												src={playBtn}
												alt="playbutton"
												onClick={this.playVideo}
											/>
										)}
									</div>
								</div>
								<div
									className={`videopart ${
										this.state.showVideo ? "showele" : "hidele"
									}`}
								>
									<iframe
										src={this.state.currentBannerItem.videoLink}
										style={{ width: "100%", height: "100%" }}
										border="0"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="request_quot_mb bg-gray  text-center col-12 mob-xs-1  p-0">
					<button
						type="button"
						onClick={() => this.togglerequestquote()}
						className="mt-3  btn theme-btn text-uppercase bg-red px-4 py-3 d-inline-block login-blue text-white mb-4 cursor-pointer"
					>
						Request a quote{" "}
					</button>
				</div>

				<div className="container  p-0  main-home-slider-mob d-none d-xl-block">
					<div className="thumbnails row pt-3">
						{this.state.bannerItems &&
							this.state.bannerItems.map((thumbnail, i) => {
								return (
									<div
										className="col-12 col-md-3 slide-div shadow-none"
										key={i}
										onClick={() => {
											this.setState({
												currentBannerItem: this.state.bannerItems[i],
											});
										}}
									>
										<div className="vd-option option-shadow">
											<img
												className="img-area"
												src={thumbnail.thumbnail}
												alt=""
											/>
											<div className="position-absolute text-center text-white video-title w-100">
												<h4 className="mb-0">{thumbnail.label}</h4>
											</div>
											<div className="position-absolute w-100  h-100 align-items-center play-button" />
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}

export default HomeSlider;
