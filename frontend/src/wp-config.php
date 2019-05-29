<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'restinh1_newbrmr' );

/** MySQL database username */
define( 'DB_USER', 'restinh1_newbrmr' );

/** MySQL database password */
define( 'DB_PASSWORD', 'c6#YB$Dj~iN#' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'ox[$kqpLz5AI;=_*T,qlizklh)rxmh/[@hdFy;^|aH{!zqpTWT6~S9yzqf0< <J2' );
define( 'SECURE_AUTH_KEY',  '3L,bA_nd/gPA{;FvP$+)~<hVVBs}13[pNDQ9R4<Cd(V<3[b2CX4It6!u>0![f?Gr' );
define( 'LOGGED_IN_KEY',    '^aJ1C0ZW%|ffevapgGm,{zWvdFmypH#DTB42S`N^M$A%azpfL(H$ <=qev*WOIRW' );
define( 'NONCE_KEY',        '?}hS?(p0S6%^-6A)7i2Td:%cG!<}7lCt[una{OD_;;Xhxsz m2,Yfn/@?!%J_{Tq' );
define( 'AUTH_SALT',        'ASQ$h,!7h.K5z/-QC$Gu<^r_spiQoUAZ;3] }](GabdJFN%/E!KHWmdNVhE%XBvB' );
define( 'SECURE_AUTH_SALT', 'd{r7Z@6c.[5ht$Sms8|g%t^:nz9}R<+87DRZ=]JnI[Ao=7Y 5tAWw)l*>i HTuGz' );
define( 'LOGGED_IN_SALT',   '$Fd6(WocN3+T[L/s:zL86612|a[P}#?DJjxtEs=i^A@qK4,~`pV?yWf{ie;L  }d' );
define( 'NONCE_SALT',       'I2q-y9U_[DpwBa=rabKm VOD q?$d51-*@WLzaw~G:>9NtD5&+BMwNA#;1^Nw=?y' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
