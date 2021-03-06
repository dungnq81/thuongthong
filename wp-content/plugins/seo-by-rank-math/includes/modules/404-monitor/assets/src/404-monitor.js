/**
 * External Dependencies
 */
import jQuery from 'jquery'

/*!
* Rank Math - 404 Monitor
*
* @version 0.9.0
* @author  Rank Math
*/
( function( $ ) {
	'use strict'

	// Document Ready
	$( function() {
		const rankMath404Monitor = {
			// Set up handlers.
			init: () => {
				this.wrap = $( '.rank-math-404-monitor-wrap' )
				// "Delete log item" handler.
				this.wrap.on( 'click', '.rank-math-404-delete', function( event ) {
					event.preventDefault()
					const $this = $( this ),
						url = $this.attr( 'href' ).replace( 'admin.php', 'admin-ajax.php' ).replace( 'action=delete', 'action=rank_math_delete_log' ).replace( 'page=', 'math=' )

					$.ajax( {
						url,
						type: 'GET',
						success: ( results ) => {
							if ( results && results.success ) {
								$this.closest( 'tr' ).fadeOut( 800, function() {
									$( this ).remove()
								} )
							}
						},
					} )
				} )

				// "Clear log" action handler.
				this.wrap.on( 'click', '.rank-math-clear-logs', function( event ) {
					event.preventDefault()

					if ( ! confirm( rankMath.logConfirmClear ) ) {
						return false
					}

					$( this ).closest( 'form' ).append( '<input type="hidden" name="action" value="clear_log">' ).submit()
				} )

				// "Bulk action" handler.
				$( '#doaction, #doaction2' ).on( 'click', function() {
					if ( 'redirect' === $( '#bulk-action-selector-top' ).val() ) {
						$( this ).closest( 'form' ).attr( 'action', rankMath.redirectionsUri )
					}
				} )
			},
		}

		rankMath404Monitor.init()
	} )
}( jQuery ) )
