import {Component, DebugElement, ViewEncapsulation} from "@angular/core";
import {ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
//
import {NgxFloatUiModule, NgxFloatUiDirective, NgxFloatUiPlacements} from "ngx-float-ui";

@Component({
    template: `
		<div>
			<div class="pop-demo">
				<article>
					<h2 class="pop-title-light">PIZZA WORKS</h2>
					<div class="pop-generic-section">
						<float-ui-content #myPopperContentz><p class="pop-lucky-font">Popcorn</p></float-ui-content>
						<img alt="Popcorn box"
							 [src]="popCornBox"
							 [floatUi]="myPopperContentz"
							 (onUpdate)="onPopperUpdate($event)"
							 [showOnStart]="true"
							 trigger="click"
							 [placement]="topPlacement"
							 class="pop-popcorn-box">
					</div>
					<button foo>Foo button
					</button>
				</article>
			</div>
			<div class="pop-demo">
				<article>
					<h2 class="pop-title-light">PIZZA WORKS</h2>
					<div class="pop-generic-section">
						<img alt="Popcorn box"
							 [src]="popCornBox"
							 floatUi="Direct popcorn"
							 trigger="click"
							 [placement]="topPlacement"
							 class="pop-popcorn-box">
					</div>
				</article>
			</div>
			<div class="pop-demo">
				<article>
					<h2 class="pop-title-light">PIZZA FIXED</h2>
					<div class="pop-generic-section">
						<img alt="Popcorn box"
							 [src]="popCornBox"
							 [positionFixed]="true"
							 floatUi="Direct popcorn"
							 trigger="click"
							 [placement]="topPlacement"
							 class="pop-popcorn-box">
					</div>
				</article>
			</div>
			<div class="pop-demo">
				<article>
					<h2 class="pop-title-light">PIZZA ON THE RIGHT</h2>
					<div class="pop-generic-section">
						<img alt="Popcorn box"
							 [src]="popCornBox"
							 floatUi="Direct popcorn"
							 trigger="click"
							 showOnStart
							 [placement]="rightPlacement"
							 class="pop-popcorn-box">
					</div>
				</article>
			</div>
		</div>
    `,
    styleUrls: [
        "../../../../../ngx-float-ui-repo/src/app/components/demo/demo.component.scss"
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgxFloatUiModule]
})
class NgxFloatUiDirectiveTestComponent {

    popCornBox: string = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDE4OCAxNjkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyBpZD0iQXJ0Ym9hcmQxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLC0xOTUwLC0xMDUwKSI+CiAgICAgICAgPHJlY3QgeD0iMTk1MCIgeT0iMTA1MCIgd2lkdGg9IjE4Ny40OTgiIGhlaWdodD0iMTY4Ljc1IiBzdHlsZT0iZmlsbDpub25lOyIvPgogICAgICAgIDxjbGlwUGF0aCBpZD0iX2NsaXAxIj4KICAgICAgICAgICAgPHJlY3QgeD0iMTk1MCIgeT0iMTA1MCIgd2lkdGg9IjE4Ny40OTgiIGhlaWdodD0iMTY4Ljc1Ii8+CiAgICAgICAgPC9jbGlwUGF0aD4KICAgICAgICA8ZyBjbGlwLXBhdGg9InVybCgjX2NsaXAxKSI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMTguNzUsMi4zNDE5NWUtMTEpIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEuNSwwLjAwMjM3MzY2LC02OTMuNzUpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjExOC43NSwxMTc0LjVDMjExOC43NSwxMTY3Ljg3IDIxMTAuNjksMTE2Mi41IDIxMDAuNzUsMTE2Mi41QzIwNjQuOTMsMTE2Mi41IDE5ODUuMDgsMTE2Mi41IDE5NDkuMjYsMTE2Mi41QzE5MzkuMzEsMTE2Mi41IDE5MzEuMjYsMTE2Ny44NyAxOTMxLjI2LDExNzQuNUMxOTMxLjI2LDExOTUuNjggMTkzMS4yNiwxMjM3LjUgMTkzMS4yNiwxMjM3LjVMMjExOC43NSwxMjM3LjVMMjExOC43NSwxMTc0LjVaIiBzdHlsZT0iZmlsbDpyZ2IoMjU1LDIzMCwxNTcpOyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMTAwLjc1LDExNjIuNUwyMTAwLjk4LDExNjIuNUwyMTAxLjIyLDExNjIuNUwyMTAxLjQ1LDExNjIuNTFMMjEwMS42OCwxMTYyLjUyTDIxMDEuOTEsMTE2Mi41MkwyMTAyLjE0LDExNjIuNTRMMjEwMi4zNiwxMTYyLjU1TDIxMDIuNTksMTE2Mi41NkwyMTAyLjgyLDExNjIuNThMMjEwMy4wNCwxMTYyLjZMMjEwMy4yNywxMTYyLjYyTDIxMDMuNDksMTE2Mi42NEwyMTAzLjcxLDExNjIuNjZMMjEwMy45NCwxMTYyLjY5TDIxMDQuMTYsMTE2Mi43MUwyMTA0LjM4LDExNjIuNzRMMjEwNC42LDExNjIuNzhMMjEwNC44MiwxMTYyLjgxTDIxMDUuMDMsMTE2Mi44NEwyMTA1LjI1LDExNjIuODhMMjEwNS40NiwxMTYyLjkyTDIxMDUuNjgsMTE2Mi45NUwyMTA1Ljg5LDExNjNMMjEwNi4xLDExNjMuMDRMMjEwNi4zMSwxMTYzLjA4TDIxMDYuNTIsMTE2My4xM0wyMTA2LjczLDExNjMuMThMMjEwNi45NCwxMTYzLjIzTDIxMDcuMTQsMTE2My4yOEwyMTA3LjM1LDExNjMuMzNMMjEwNy41NSwxMTYzLjM5TDIxMDcuNzYsMTE2My40NEwyMTA3Ljk2LDExNjMuNUwyMTA4LjE2LDExNjMuNTZMMjEwOC4zNiwxMTYzLjYyTDIxMDguNTUsMTE2My42OEwyMTA4Ljc1LDExNjMuNzVMMjEwOC45NSwxMTYzLjgxTDIxMDkuMTQsMTE2My44OEwyMTA5LjMzLDExNjMuOTVMMjEwOS41MiwxMTY0LjAyTDIxMDkuNzEsMTE2NC4wOUwyMTA5LjksMTE2NC4xNkwyMTEwLjA4LDExNjQuMjRMMjExMC4yNywxMTY0LjMxTDIxMTAuNDUsMTE2NC4zOUwyMTEwLjYzLDExNjQuNDdMMjExMC44MSwxMTY0LjU1TDIxMTAuOTksMTE2NC42M0wyMTExLjE3LDExNjQuNzFMMjExMS4zNSwxMTY0LjhMMjExMS41MiwxMTY0Ljg4TDIxMTEuNjksMTE2NC45N0wyMTExLjg2LDExNjUuMDZMMjExMi4wMywxMTY1LjE1TDIxMTIuMiwxMTY1LjI0TDIxMTIuMzcsMTE2NS4zM0wyMTEyLjUzLDExNjUuNDNMMjExMi42OSwxMTY1LjUyTDIxMTIuODUsMTE2NS42MkwyMTEzLjAxLDExNjUuNzFMMjExMy4xNywxMTY1LjgxTDIxMTMuMzIsMTE2NS45MUwyMTEzLjQ4LDExNjYuMDJMMjExMy42MywxMTY2LjEyTDIxMTMuNzgsMTE2Ni4yMkwyMTEzLjkzLDExNjYuMzNMMjExNC4wNywxMTY2LjQzTDIxMTQuMjIsMTE2Ni41NEwyMTE0LjM2LDExNjYuNjVMMjExNC41LDExNjYuNzZMMjExNC42NCwxMTY2Ljg3TDIxMTQuNzgsMTE2Ni45OEwyMTE0LjkxLDExNjcuMDlMMjExNS4wNCwxMTY3LjJMMjExNS4xNywxMTY3LjMyTDIxMTUuMywxMTY3LjQ0TDIxMTUuNDMsMTE2Ny41NUwyMTE1LjU1LDExNjcuNjdMMjExNS42OCwxMTY3Ljc5TDIxMTUuOCwxMTY3LjkxTDIxMTUuOTEsMTE2OC4wM0wyMTE2LjAzLDExNjguMTVMMjExNi4xNCwxMTY4LjI4TDIxMTYuMjYsMTE2OC40TDIxMTYuMzcsMTE2OC41M0wyMTE2LjQ3LDExNjguNjVMMjExNi41OCwxMTY4Ljc4TDIxMTYuNjgsMTE2OC45MUwyMTE2Ljc4LDExNjkuMDRMMjExNi44OCwxMTY5LjE3TDIxMTYuOTcsMTE2OS4zTDIxMTcuMDcsMTE2OS40M0wyMTE3LjE2LDExNjkuNTZMMjExNy4yNSwxMTY5LjY5TDIxMTcuMzQsMTE2OS44M0wyMTE3LjQyLDExNjkuOTZMMjExNy41LDExNzAuMUwyMTE3LjU4LDExNzAuMjRMMjExNy42NiwxMTcwLjM3TDIxMTcuNzMsMTE3MC41MUwyMTE3LjgsMTE3MC42NUwyMTE3Ljg3LDExNzAuNzlMMjExNy45NCwxMTcwLjkzTDIxMTguMDEsMTE3MS4wN0wyMTE4LjA3LDExNzEuMjFMMjExOC4xMywxMTcxLjM2TDIxMTguMTgsMTE3MS41TDIxMTguMjQsMTE3MS42NEwyMTE4LjI5LDExNzEuNzlMMjExOC4zNCwxMTcxLjkzTDIxMTguMzgsMTE3Mi4wOEwyMTE4LjQzLDExNzIuMjNMMjExOC40NywxMTcyLjM4TDIxMTguNTEsMTE3Mi41MkwyMTE4LjU0LDExNzIuNjdMMjExOC41NywxMTcyLjgyTDIxMTguNjEsMTE3Mi45N0wyMTE4LjYzLDExNzMuMTJMMjExOC42NiwxMTczLjI3TDIxMTguNjgsMTE3My40MkwyMTE4LjcsMTE3My41OEwyMTE4LjcxLDExNzMuNzNMMjExOC43MywxMTczLjg4TDIxMTguNzQsMTE3NC4wNEwyMTE4Ljc0LDExNzQuMTlMMjExOC43NSwxMTc0LjM1TDIxMTguNzUsMTE3NC41TDIxMTguNzUsMTIzNy41TDE5MzEuMjYsMTIzNy41TDE5MzEuMjYsMTE3NC41TDE5MzEuMjYsMTE3NC4zNUwxOTMxLjI2LDExNzQuMTlMMTkzMS4yNywxMTc0LjA0TDE5MzEuMjgsMTE3My44OEwxOTMxLjI5LDExNzMuNzNMMTkzMS4zMSwxMTczLjU4TDE5MzEuMzMsMTE3My40MkwxOTMxLjM1LDExNzMuMjdMMTkzMS4zNywxMTczLjEyTDE5MzEuNCwxMTcyLjk3TDE5MzEuNDMsMTE3Mi44MkwxOTMxLjQ2LDExNzIuNjdMMTkzMS41LDExNzIuNTJMMTkzMS41NCwxMTcyLjM4TDE5MzEuNTgsMTE3Mi4yM0wxOTMxLjYyLDExNzIuMDhMMTkzMS42NywxMTcxLjkzTDE5MzEuNzIsMTE3MS43OUwxOTMxLjc3LDExNzEuNjRMMTkzMS44MiwxMTcxLjVMMTkzMS44OCwxMTcxLjM2TDE5MzEuOTQsMTE3MS4yMUwxOTMyLDExNzEuMDdMMTkzMi4wNiwxMTcwLjkzTDE5MzIuMTMsMTE3MC43OUwxOTMyLjIsMTE3MC42NUwxOTMyLjI3LDExNzAuNTFMMTkzMi4zNSwxMTcwLjM3TDE5MzIuNDIsMTE3MC4yNEwxOTMyLjUsMTE3MC4xTDE5MzIuNTksMTE2OS45NkwxOTMyLjY3LDExNjkuODNMMTkzMi43NiwxMTY5LjY5TDE5MzIuODUsMTE2OS41NkwxOTMyLjk0LDExNjkuNDNMMTkzMy4wMywxMTY5LjNMMTkzMy4xMywxMTY5LjE3TDE5MzMuMjIsMTE2OS4wNEwxOTMzLjMyLDExNjguOTFMMTkzMy40MywxMTY4Ljc4TDE5MzMuNTMsMTE2OC42NUwxOTMzLjY0LDExNjguNTNMMTkzMy43NSwxMTY4LjRMMTkzMy44NiwxMTY4LjI4TDE5MzMuOTcsMTE2OC4xNUwxOTM0LjA5LDExNjguMDNMMTkzNC4yMSwxMTY3LjkxTDE5MzQuMzMsMTE2Ny43OUwxOTM0LjQ1LDExNjcuNjdMMTkzNC41OCwxMTY3LjU1TDE5MzQuNywxMTY3LjQ0TDE5MzQuODMsMTE2Ny4zMkwxOTM0Ljk2LDExNjcuMkwxOTM1LjA5LDExNjcuMDlMMTkzNS4yMywxMTY2Ljk4TDE5MzUuMzcsMTE2Ni44N0wxOTM1LjUsMTE2Ni43NkwxOTM1LjY0LDExNjYuNjVMMTkzNS43OSwxMTY2LjU0TDE5MzUuOTMsMTE2Ni40M0wxOTM2LjA4LDExNjYuMzNMMTkzNi4yMywxMTY2LjIyTDE5MzYuMzgsMTE2Ni4xMkwxOTM2LjUzLDExNjYuMDJMMTkzNi42OCwxMTY1LjkxTDE5MzYuODQsMTE2NS44MUwxOTM2Ljk5LDExNjUuNzFMMTkzNy4xNSwxMTY1LjYyTDE5MzcuMzEsMTE2NS41MkwxOTM3LjQ4LDExNjUuNDNMMTkzNy42NCwxMTY1LjMzTDE5MzcuODEsMTE2NS4yNEwxOTM3Ljk3LDExNjUuMTVMMTkzOC4xNCwxMTY1LjA2TDE5MzguMzEsMTE2NC45N0wxOTM4LjQ5LDExNjQuODhMMTkzOC42NiwxMTY0LjhMMTkzOC44NCwxMTY0LjcxTDE5MzkuMDEsMTE2NC42M0wxOTM5LjE5LDExNjQuNTVMMTkzOS4zNywxMTY0LjQ3TDE5MzkuNTUsMTE2NC4zOUwxOTM5Ljc0LDExNjQuMzFMMTkzOS45MiwxMTY0LjI0TDE5NDAuMTEsMTE2NC4xNkwxOTQwLjMsMTE2NC4wOUwxOTQwLjQ4LDExNjQuMDJMMTk0MC42NywxMTYzLjk1TDE5NDAuODcsMTE2My44OEwxOTQxLjA2LDExNjMuODFMMTk0MS4yNiwxMTYzLjc1TDE5NDEuNDUsMTE2My42OEwxOTQxLjY1LDExNjMuNjJMMTk0MS44NSwxMTYzLjU2TDE5NDIuMDUsMTE2My41TDE5NDIuMjUsMTE2My40NEwxOTQyLjQ1LDExNjMuMzlMMTk0Mi42NSwxMTYzLjMzTDE5NDIuODYsMTE2My4yOEwxOTQzLjA3LDExNjMuMjNMMTk0My4yNywxMTYzLjE4TDE5NDMuNDgsMTE2My4xM0wxOTQzLjY5LDExNjMuMDhMMTk0My45LDExNjMuMDRMMTk0NC4xMSwxMTYzTDE5NDQuMzMsMTE2Mi45NUwxOTQ0LjU0LDExNjIuOTJMMTk0NC43NiwxMTYyLjg4TDE5NDQuOTcsMTE2Mi44NEwxOTQ1LjE5LDExNjIuODFMMTk0NS40MSwxMTYyLjc4TDE5NDUuNjMsMTE2Mi43NEwxOTQ1Ljg1LDExNjIuNzFMMTk0Ni4wNywxMTYyLjY5TDE5NDYuMjksMTE2Mi42NkwxOTQ2LjUxLDExNjIuNjRMMTk0Ni43NCwxMTYyLjYyTDE5NDYuOTYsMTE2Mi42TDE5NDcuMTksMTE2Mi41OEwxOTQ3LjQxLDExNjIuNTZMMTk0Ny42NCwxMTYyLjU1TDE5NDcuODcsMTE2Mi41NEwxOTQ4LjEsMTE2Mi41MkwxOTQ4LjMzLDExNjIuNTJMMTk0OC41NiwxMTYyLjUxTDE5NDguNzksMTE2Mi41TDE5NDkuMDIsMTE2Mi41TDE5NDkuMjYsMTE2Mi41TDIxMDAuNzUsMTE2Mi41Wk0xOTQ5LjA1LDExNjQuMDNMMTk0OC44NSwxMTY0LjAzTDE5NDguNjUsMTE2NC4wNEwxOTQ4LjQ0LDExNjQuMDRMMTk0OC4yNCwxMTY0LjA1TDE5NDguMDQsMTE2NC4wNkwxOTQ3Ljg0LDExNjQuMDdMMTk0Ny42NSwxMTY0LjA4TDE5NDcuNDUsMTE2NC4xTDE5NDcuMjUsMTE2NC4xMUwxOTQ3LjA2LDExNjQuMTNMMTk0Ni44NiwxMTY0LjE1TDE5NDYuNjYsMTE2NC4xN0wxOTQ2LjQ3LDExNjQuMTlMMTk0Ni4yOCwxMTY0LjIxTDE5NDYuMDksMTE2NC4yNEwxOTQ1Ljg5LDExNjQuMjdMMTk0NS43LDExNjQuM0wxOTQ1LjUyLDExNjQuMzNMMTk0NS4zMywxMTY0LjM2TDE5NDUuMTQsMTE2NC4zOUwxOTQ0Ljk1LDExNjQuNDJMMTk0NC43NywxMTY0LjQ2TDE5NDQuNTgsMTE2NC41TDE5NDQuNCwxMTY0LjU0TDE5NDQuMjIsMTE2NC41OEwxOTQ0LjAzLDExNjQuNjJMMTk0My44NSwxMTY0LjY2TDE5NDMuNjcsMTE2NC43MUwxOTQzLjUsMTE2NC43NUwxOTQzLjMyLDExNjQuOEwxOTQzLjE0LDExNjQuODVMMTk0Mi45NywxMTY0LjlMMTk0Mi43OSwxMTY0Ljk1TDE5NDIuNjIsMTE2NS4wMUwxOTQyLjQ1LDExNjUuMDZMMTk0Mi4yOCwxMTY1LjEyTDE5NDIuMTEsMTE2NS4xN0wxOTQxLjk0LDExNjUuMjNMMTk0MS43NywxMTY1LjI5TDE5NDEuNiwxMTY1LjM1TDE5NDEuNDQsMTE2NS40MUwxOTQxLjI3LDExNjUuNDhMMTk0MS4xMSwxMTY1LjU0TDE5NDAuOTUsMTE2NS42MUwxOTQwLjc5LDExNjUuNjhMMTk0MC42MywxMTY1Ljc1TDE5NDAuNDcsMTE2NS44MkwxOTQwLjMyLDExNjUuODlMMTk0MC4xNiwxMTY1Ljk2TDE5NDAuMDEsMTE2Ni4wM0wxOTM5Ljg2LDExNjYuMTFMMTkzOS43MSwxMTY2LjE4TDE5MzkuNTYsMTE2Ni4yNkwxOTM5LjQxLDExNjYuMzRMMTkzOS4yNiwxMTY2LjQyTDE5MzkuMTIsMTE2Ni41TDE5MzguOTgsMTE2Ni41OEwxOTM4LjgzLDExNjYuNjZMMTkzOC42OSwxMTY2Ljc1TDE5MzguNTUsMTE2Ni44M0wxOTM4LjQyLDExNjYuOTJMMTkzOC4yOCwxMTY3LjAxTDE5MzguMTUsMTE2Ny4xTDE5MzguMDIsMTE2Ny4xOEwxOTM3Ljg4LDExNjcuMjhMMTkzNy43NSwxMTY3LjM3TDE5MzcuNjMsMTE2Ny40NkwxOTM3LjUsMTE2Ny41NUwxOTM3LjM4LDExNjcuNjVMMTkzNy4yNSwxMTY3Ljc0TDE5MzcuMTMsMTE2Ny44NEwxOTM3LjAxLDExNjcuOTRMMTkzNi45LDExNjguMDRMMTkzNi43OCwxMTY4LjEzTDE5MzYuNjcsMTE2OC4yNEwxOTM2LjU1LDExNjguMzRMMTkzNi40NCwxMTY4LjQ0TDE5MzYuMzQsMTE2OC41NEwxOTM2LjIzLDExNjguNjVMMTkzNi4xMiwxMTY4Ljc1TDE5MzYuMDIsMTE2OC44NkwxOTM1LjkyLDExNjguOTZMMTkzNS44MiwxMTY5LjA3TDE5MzUuNzIsMTE2OS4xOEwxOTM1LjYzLDExNjkuMjlMMTkzNS41MywxMTY5LjRMMTkzNS40NCwxMTY5LjUxTDE5MzUuMzUsMTE2OS42MkwxOTM1LjI2LDExNjkuNzNMMTkzNS4xOCwxMTY5Ljg1TDE5MzUuMDksMTE2OS45NkwxOTM1LjAxLDExNzAuMDhMMTkzNC45MywxMTcwLjE5TDE5MzQuODYsMTE3MC4zMUwxOTM0Ljc4LDExNzAuNDJMMTkzNC43MSwxMTcwLjU0TDE5MzQuNjMsMTE3MC42NkwxOTM0LjU3LDExNzAuNzhMMTkzNC41LDExNzAuOUwxOTM0LjQzLDExNzEuMDJMMTkzNC4zNywxMTcxLjE0TDE5MzQuMzEsMTE3MS4yNkwxOTM0LjI1LDExNzEuMzhMMTkzNC4yLDExNzEuNTFMMTkzNC4xNCwxMTcxLjYzTDE5MzQuMDksMTE3MS43NkwxOTM0LjA0LDExNzEuODhMMTkzMy45OSwxMTcyLjAxTDE5MzMuOTUsMTE3Mi4xM0wxOTMzLjkxLDExNzIuMjZMMTkzMy44NywxMTcyLjM5TDE5MzMuODMsMTE3Mi41MkwxOTMzLjc5LDExNzIuNjRMMTkzMy43NiwxMTcyLjc3TDE5MzMuNzMsMTE3Mi45TDE5MzMuNywxMTczLjAzTDE5MzMuNjcsMTE3My4xNkwxOTMzLjY1LDExNzMuM0wxOTMzLjYzLDExNzMuNDNMMTkzMy42MSwxMTczLjU2TDE5MzMuNTksMTE3My42OUwxOTMzLjU4LDExNzMuODNMMTkzMy41NywxMTczLjk2TDE5MzMuNTYsMTE3NC4wOUwxOTMzLjU1LDExNzQuMjNMMTkzMy41NSwxMTc0LjM2TDE5MzMuNTUsMTE3NC41MUwxOTMzLjU1LDEyMzUuOTdMMjExNi40NiwxMjM1Ljk3TDIxMTYuNDYsMTE3NC41MUwyMTE2LjQ2LDExNzQuMzZMMjExNi40NSwxMTc0LjIzTDIxMTYuNDUsMTE3NC4wOUwyMTE2LjQ0LDExNzMuOTZMMjExNi40MywxMTczLjgzTDIxMTYuNDEsMTE3My42OUwyMTE2LjQsMTE3My41NkwyMTE2LjM4LDExNzMuNDNMMjExNi4zNiwxMTczLjNMMjExNi4zMywxMTczLjE2TDIxMTYuMzEsMTE3My4wM0wyMTE2LjI4LDExNzIuOUwyMTE2LjI1LDExNzIuNzdMMjExNi4yMSwxMTcyLjY0TDIxMTYuMTgsMTE3Mi41MkwyMTE2LjE0LDExNzIuMzlMMjExNi4xLDExNzIuMjZMMjExNi4wNiwxMTcyLjEzTDIxMTYuMDEsMTE3Mi4wMUwyMTE1Ljk2LDExNzEuODhMMjExNS45MSwxMTcxLjc2TDIxMTUuODYsMTE3MS42M0wyMTE1LjgxLDExNzEuNTFMMjExNS43NSwxMTcxLjM4TDIxMTUuNjksMTE3MS4yNkwyMTE1LjYzLDExNzEuMTRMMjExNS41NywxMTcxLjAyTDIxMTUuNTEsMTE3MC45TDIxMTUuNDQsMTE3MC43OEwyMTE1LjM3LDExNzAuNjZMMjExNS4zLDExNzAuNTRMMjExNS4yMiwxMTcwLjQyTDIxMTUuMTUsMTE3MC4zMUwyMTE1LjA3LDExNzAuMTlMMjExNC45OSwxMTcwLjA4TDIxMTQuOTEsMTE2OS45NkwyMTE0LjgzLDExNjkuODVMMjExNC43NCwxMTY5LjczTDIxMTQuNjUsMTE2OS42MkwyMTE0LjU2LDExNjkuNTFMMjExNC40NywxMTY5LjRMMjExNC4zOCwxMTY5LjI5TDIxMTQuMjgsMTE2OS4xOEwyMTE0LjE5LDExNjkuMDdMMjExNC4wOSwxMTY4Ljk2TDIxMTMuOTksMTE2OC44NkwyMTEzLjg4LDExNjguNzVMMjExMy43OCwxMTY4LjY1TDIxMTMuNjcsMTE2OC41NEwyMTEzLjU2LDExNjguNDRMMjExMy40NSwxMTY4LjM0TDIxMTMuMzQsMTE2OC4yNEwyMTEzLjIyLDExNjguMTNMMjExMy4xMSwxMTY4LjA0TDIxMTIuOTksMTE2Ny45NEwyMTEyLjg3LDExNjcuODRMMjExMi43NSwxMTY3Ljc0TDIxMTIuNjMsMTE2Ny42NUwyMTEyLjUsMTE2Ny41NUwyMTEyLjM4LDExNjcuNDZMMjExMi4yNSwxMTY3LjM3TDIxMTIuMTIsMTE2Ny4yOEwyMTExLjk5LDExNjcuMThMMjExMS44NiwxMTY3LjFMMjExMS43MiwxMTY3LjAxTDIxMTEuNTksMTE2Ni45MkwyMTExLjQ1LDExNjYuODNMMjExMS4zMSwxMTY2Ljc1TDIxMTEuMTcsMTE2Ni42NkwyMTExLjAzLDExNjYuNThMMjExMC44OSwxMTY2LjVMMjExMC43NCwxMTY2LjQyTDIxMTAuNiwxMTY2LjM0TDIxMTAuNDUsMTE2Ni4yNkwyMTEwLjMsMTE2Ni4xOEwyMTEwLjE1LDExNjYuMTFMMjEwOS45OSwxMTY2LjAzTDIxMDkuODQsMTE2NS45NkwyMTA5LjY5LDExNjUuODlMMjEwOS41MywxMTY1LjgyTDIxMDkuMzcsMTE2NS43NUwyMTA5LjIyLDExNjUuNjhMMjEwOS4wNSwxMTY1LjYxTDIxMDguODksMTE2NS41NEwyMTA4LjczLDExNjUuNDhMMjEwOC41NywxMTY1LjQxTDIxMDguNCwxMTY1LjM1TDIxMDguMjQsMTE2NS4yOUwyMTA4LjA3LDExNjUuMjNMMjEwNy45LDExNjUuMTdMMjEwNy43MywxMTY1LjEyTDIxMDcuNTYsMTE2NS4wNkwyMTA3LjM5LDExNjUuMDFMMjEwNy4yMSwxMTY0Ljk1TDIxMDcuMDQsMTE2NC45TDIxMDYuODYsMTE2NC44NUwyMTA2LjY5LDExNjQuOEwyMTA2LjUxLDExNjQuNzVMMjEwNi4zMywxMTY0LjcxTDIxMDYuMTUsMTE2NC42NkwyMTA1Ljk3LDExNjQuNjJMMjEwNS43OSwxMTY0LjU4TDIxMDUuNjEsMTE2NC41NEwyMTA1LjQyLDExNjQuNUwyMTA1LjI0LDExNjQuNDZMMjEwNS4wNSwxMTY0LjQyTDIxMDQuODcsMTE2NC4zOUwyMTA0LjY4LDExNjQuMzZMMjEwNC40OSwxMTY0LjMzTDIxMDQuMywxMTY0LjNMMjEwNC4xMSwxMTY0LjI3TDIxMDMuOTIsMTE2NC4yNEwyMTAzLjczLDExNjQuMjFMMjEwMy41MywxMTY0LjE5TDIxMDMuMzQsMTE2NC4xN0wyMTAzLjE0LDExNjQuMTVMMjEwMi45NSwxMTY0LjEzTDIxMDIuNzUsMTE2NC4xMUwyMTAyLjU2LDExNjQuMUwyMTAyLjM2LDExNjQuMDhMMjEwMi4xNiwxMTY0LjA3TDIxMDEuOTYsMTE2NC4wNkwyMTAxLjc2LDExNjQuMDVMMjEwMS41NiwxMTY0LjA0TDIxMDEuMzYsMTE2NC4wNEwyMTAxLjE2LDExNjQuMDNMMjEwMC45NSwxMTY0LjAzTDIxMDAuNzQsMTE2NC4wM0wxOTQ5LjI2LDExNjQuMDNMMTk0OS4wNSwxMTY0LjAzWiIgc3R5bGU9ImZpbGw6cmdiKDIwMCw1OSw4MCk7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjA0NzM2LDAsMCwxLjA2MDQ0LC0zNjAuOTcsLTU3LjQwMDQpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjE5MC43MSwxMTUwLjI1QzIxOTAuNzEsMTE1MC4yNSAyMTkwLjI0LDExMjUuNjkgMjE5Mi4yOSwxMTIyLjc3QzIxOTQuMjQsMTExOS45OSAyMTk5LjQxLDExMTguOTIgMjE5OS40MSwxMTE4LjkyQzIxOTkuNDEsMTExOC45MiAyMTk0LDExMDYuODQgMjIwMC42OSwxMDk3LjAzQzIyMDcuNTUsMTA4Ni45NiAyMjIyLjQ5LDEwODcuOTcgMjIyMi40OSwxMDg3Ljk3QzIyMjIuNDksMTA4Ny45NyAyMjI0Ljg0LDEwNzUuMzggMjIzNi42NSwxMDc1LjFDMjI0OS43NCwxMDc0LjggMjI1Mi42NSwxMDg4LjAxIDIyNTIuNjUsMTA4OC4wMUMyMjUyLjY1LDEwODguMDEgMjI1NS4yMywxMDg4LjQ3IDIyNTYuMzYsMTA4OS4wN0MyMjU3LjUzLDEwODkuNyAyMjU5LjI1LDEwOTEuMSAyMjU5LjI1LDEwOTEuMUMyMjU5LjI1LDEwOTEuMSAyMjU5Ljk1LDEwNzkuNjcgMjI2OC4yNywxMDc2LjQxQzIyODAuMjUsMTA3MS42OSAyMjg3LjE3LDEwODEuNDkgMjI4Ny4xNywxMDgxLjQ5QzIyODcuMTcsMTA4MS40OSAyMjg4LjQyLDEwNzkuMTIgMjI5MS4wNSwxMDc3LjM2QzIyOTMuMzUsMTA3NS44MiAyMjk3LjQ1LDEwNzYgMjI5Ny40NSwxMDc2QzIyOTcuNDUsMTA3NiAyMjkyLjk2LDEwNTkuMTYgMjMxMS41NywxMDU2LjI2QzIzMjQuNiwxMDU0LjIyIDIzMjcuOTksMTA2OS4xIDIzMjcuOTksMTA2OS4xQzIzMjcuOTksMTA2OS4xIDIzMzQuMjYsMTA2Ny4zNSAyMzM4LjMyLDEwNzEuOTJDMjM0MS45LDEwNzUuOTMgMjM0MC4zNCwxMDgxLjY5IDIzNDAuMzQsMTA4MS42OUMyMzQwLjM0LDEwODEuNjkgMjM0Mi43OCwxMDgyLjIzIDIzNDQuMzUsMTA4NC4wOEMyMzQ1Ljk1LDEwODUuOTggMjM0NS43NSwxMDg4LjEyIDIzNDUuNzUsMTA4OC4xMkMyMzQ1Ljc1LDEwODguMTIgMjM1NS40OSwxMDg2LjI4IDIzNTguNjMsMTA5Mi44NEMyMzYyLjMzLDExMDAuNTQgMjM1NC44MiwxMTA0LjczIDIzNTQuODIsMTEwNC43M0MyMzU0LjgyLDExMDQuNzMgMjM1Ny45OSwxMTA3LjcxIDIzNTguODgsMTExMS40MkMyMzU5Ljc5LDExMTUuMiAyMzU4Ljk1LDExMTguOTYgMjM1OC45NSwxMTE4Ljk2QzIzNTguOTUsMTExOC45NiAyMzYyLjYsMTEyMC41MyAyMzY0LjM0LDExMjMuMzNDMjM2Ni4yLDExMjYuMzQgMjM2Ni42MywxMTUwLjQ3IDIzNjYuNjMsMTE1MC40N0wyMTkwLjcxLDExNTAuMjVaIiBzdHlsZT0iZmlsbDpyZ2IoMjU1LDIxOCwxMjUpOyIvPgogICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PSIyMjQwLjU0IiBjeT0iMTA5My44MiIgcng9IjYuNTY0IiByeT0iNi41MiIgc3R5bGU9ImZpbGw6cmdiKDI1NSwxNzMsMjYpOyIvPgogICAgICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PSIyMzE4LjczIiBjeT0iMTA4NC40OSIgcng9IjkuNDM1IiByeT0iOS41MTEiIHN0eWxlPSJmaWxsOnJnYigyNTUsMTczLDI2KTsiLz4KICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZSBjeD0iMjM0MC41MyIgY3k9IjExMDAuMDgiIHJ4PSI2LjQxNCIgcnk9IjYuMjI2IiBzdHlsZT0iZmlsbDpyZ2IoMjU1LDE3MywyNik7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIyMDIuMjUsMTE1MC4xNUMyMjAyLjI1LDExNTAuMTUgMjE5Ni40OSwxMTMzLjAzIDIyMDUuNDMsMTEyNS4xNEMyMjEzLjQ2LDExMTguMDYgMjIxOS4yOCwxMTIxLjA3IDIyMTkuMjgsMTEyMS4wN0wyMjIxLjcsMTExOS4yNEMyMjIxLjcsMTExOS4yNCAyMjIwLjgsMTExNC44MyAyMjIyLjU5LDExMTEuMDRDMjIyNC43LDExMDYuNTUgMjIyOC45MSwxMTA1LjY4IDIyMzEuNzUsMTEwNS43OEMyMjM5LjIsMTEwNi4wMyAyMjM5LjUxLDExMTIuOTYgMjIzOS41MSwxMTEyLjk2QzIyMzkuNTEsMTExMi45NiAyMjQ1LjUxLDExMTIuNzYgMjI0Ny43NCwxMTEzLjU3QzIyNDkuNzIsMTExNC4yOSAyMjUxLjU2LDExMTUuOSAyMjUyLjM4LDExMTcuODJDMjI1My4xOSwxMTE5LjczIDIyNTIuNjMsMTEyNS4wNiAyMjUyLjYzLDExMjUuMDZDMjI1Mi42MywxMTI1LjA2IDIyNTUuNDMsMTEyNC4zOSAyMjU4LjQzLDExMjQuOTJDMjI2MS4wNiwxMTI1LjM4IDIyNjIuNTgsMTEyNy4wMSAyMjYyLjU4LDExMjcuMDFMMjI2NS4yNSwxMTI1Ljk2QzIyNjUuMjUsMTEyNS45NiAyMjY1LjE4LDExMTkuMjkgMjI2Ni4zNywxMTE3LjA3QzIyNjcuNTYsMTExNC44NyAyMjcyLjQ0LDExMTIuNjMgMjI3Mi40NCwxMTEyLjYzQzIyNzIuNDQsMTExMi42MyAyMjcwLjg5LDExMTAuMjMgMjI3MS4yLDExMDguNTZDMjI3MS44LDExMDUuMjggMjI3Mi42NCwxMTAzLjggMjI3NC42MywxMTAyLjE5QzIyNzcuMDEsMTEwMC4yNyAyMjc4LjIyLDExMDAuMTMgMjI4MS4yOSwxMDk5Ljg2QzIyODMuMjEsMTA5OS42OCAyMjg1LjA5LDExMDAuOTUgMjI4NS4wOSwxMTAwLjk1QzIyODUuMDksMTEwMC45NSAyMjg3LjAxLDEwOTcuODcgMjI4OC4yNiwxMDk2LjczQzIyODkuNTIsMTA5NS41OCAyMjkxLjAzLDEwOTQuNjQgMjI5Mi42MywxMDk0LjA4QzIyOTQuMjMsMTA5My41MSAyMjk2LjIyLDEwOTMuMjcgMjI5Ny44NiwxMDkzLjM1QzIyOTkuNDUsMTA5My40MiAyMzAxLjA3LDEwOTMuNzggMjMwMi40NywxMDk0LjUxQzIzMDUuMTksMTA5NS45NCAyMzA2Ljg3LDEwOTcuMjIgMjMwOC41OSwxMTAwLjM2QzIzMDkuNzQsMTEwMi40NiAyMzA5LjYyLDExMDcuNDcgMjMwOS42MiwxMTA3LjQ3QzIzMDkuNjIsMTEwNy40NyAyMzEzLjM2LDExMDYuMzMgMjMxNS4yOCwxMTA2LjM5QzIzMTcuMjgsMTEwNi40NiAyMzE5Ljc2LDExMDYuNzYgMjMyMS42MywxMTA3Ljg2QzIzMjMuNTEsMTEwOC45NyAyMzI1LjU1LDExMTAuODcgMjMyNi41NSwxMTEzLjAzQzIzMjcuNTcsMTExNS4yMyAyMzI4LjIsMTExOC42IDIzMjcuNzQsMTEyMS4xMUMyMzI3LjI4LDExMjMuNjIgMjMyMy44MSwxMTI4LjA4IDIzMjMuODEsMTEyOC4wOEMyMzIzLjgxLDExMjguMDggMjMzMi45NSwxMTI4LjQ2IDIzMzguMzUsMTEzNS40MUMyMzQzLjM5LDExNDEuOTEgMjM0Mi4wNSwxMTUwLjUyIDIzNDIuMDUsMTE1MC41MkwyMjAyLjI1LDExNTAuMTVaIiBzdHlsZT0iZmlsbDpyZ2IoMjU1LDE3MywyNik7Ii8+CiAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC45NTQ3ODIsMCwwLDAuOTQzMDA3LDMzOS41MjEsNTUuMjA2MykiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTk2MC43LDExNTcuMzhDMTk2MS4xLDExNTMuNSAxOTYwLjQ4LDExNDcuMjIgMTk2NS41OSwxMTQyLjMyQzE5NzAuMjIsMTEzNy44OCAxOTc1LjI0LDExNDMuMDggMTk3NS4yNCwxMTQzLjA4QzE5NzUuMjQsMTE0My4wOCAxOTc3Ljg0LDExMzQuMTUgMTk5MC4zMSwxMTM1LjkzQzIwMDIuNTYsMTEzNy42OCAxOTk5LjgsMTE0NS45OCAyMDAwLjk2LDExNTAuOTdDMjAwMi4xMiwxMTU1Ljk0IDE5OTcuMjYsMTE2NS44NCAxOTk3LjI2LDExNjUuODRMMTk2My4xNCwxMTY1LjU3QzE5NjMuMTQsMTE2NS41NyAxOTYwLjQsMTE2MC4yMSAxOTYwLjcsMTE1Ny4zOFoiIHN0eWxlPSJmaWxsOnJnYigyNTUsMjE4LDEyNSk7Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTU0NzgyLDAsMCwwLjk0MzAwNywzNDQuNjQ4LDU0LjEyOSkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjAyNS42NCwxMTU3LjQxQzIwMjUuNjQsMTE1Ny40MSAyMDE2LjY1LDExNTMuMzggMjAyMi4zOSwxMTM5LjAyQzIwMjUuODQsMTEzMC4zOCAyMDM4LjY1LDExMzMuNjQgMjAzOC42NSwxMTMzLjY0QzIwMzguNjUsMTEzMy42NCAyMDM3LjQyLDExMjEuOTYgMjA0Ny42MSwxMTIxLjc2QzIwNjAuNTgsMTEyMS41MSAyMDU2LjcyLDExMzcuMzcgMjA1Ni43MiwxMTM3LjM3QzIwNTYuNzIsMTEzNy4zNyAyMDY4Ljk3LDExMzYuOTQgMjA2OS4wNiwxMTQzLjA0QzIwNjkuMjQsMTE1NS44NCAyMDU4LjksMTE1Mi4wOSAyMDU0LjUxLDExNTYuMTdDMjA1MC41MSwxMTU5Ljg5IDIwNDcuNTEsMTE2Ny4zMiAyMDQyLjcsMTE2Ny41MkMyMDM3Ljg5LDExNjcuNzMgMjAyNS42NCwxMTU3LjQxIDIwMjUuNjQsMTE1Ny40MVoiIHN0eWxlPSJmaWxsOnJnYigyNTUsMjE4LDEyNSk7Ii8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMS41LDAuMDAyMzczNjYsLTY5My43NSkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMTAwLjc1LDExNjIuNUwyMTAwLjk4LDExNjIuNUwyMTAxLjIyLDExNjIuNUwyMTAxLjQ1LDExNjIuNTFMMjEwMS42OCwxMTYyLjUyTDIxMDEuOTEsMTE2Mi41MkwyMTAyLjE0LDExNjIuNTRMMjEwMi4zNiwxMTYyLjU1TDIxMDIuNTksMTE2Mi41NkwyMTAyLjgyLDExNjIuNThMMjEwMy4wNCwxMTYyLjZMMjEwMy4yNywxMTYyLjYyTDIxMDMuNDksMTE2Mi42NEwyMTAzLjcxLDExNjIuNjZMMjEwMy45NCwxMTYyLjY5TDIxMDQuMTYsMTE2Mi43MUwyMTA0LjM4LDExNjIuNzRMMjEwNC42LDExNjIuNzhMMjEwNC44MiwxMTYyLjgxTDIxMDUuMDMsMTE2Mi44NEwyMTA1LjI1LDExNjIuODhMMjEwNS40NiwxMTYyLjkyTDIxMDUuNjgsMTE2Mi45NUwyMTA1Ljg5LDExNjNMMjEwNi4xLDExNjMuMDRMMjEwNi4zMSwxMTYzLjA4TDIxMDYuNTIsMTE2My4xM0wyMTA2LjczLDExNjMuMThMMjEwNi45NCwxMTYzLjIzTDIxMDcuMTQsMTE2My4yOEwyMTA3LjM1LDExNjMuMzNMMjEwNy41NSwxMTYzLjM5TDIxMDcuNzYsMTE2My40NEwyMTA3Ljk2LDExNjMuNUwyMTA4LjE2LDExNjMuNTZMMjEwOC4zNiwxMTYzLjYyTDIxMDguNTUsMTE2My42OEwyMTA4Ljc1LDExNjMuNzVMMjEwOC45NSwxMTYzLjgxTDIxMDkuMTQsMTE2My44OEwyMTA5LjMzLDExNjMuOTVMMjEwOS41MiwxMTY0LjAyTDIxMDkuNzEsMTE2NC4wOUwyMTA5LjksMTE2NC4xNkwyMTEwLjA4LDExNjQuMjRMMjExMC4yNywxMTY0LjMxTDIxMTAuNDUsMTE2NC4zOUwyMTEwLjYzLDExNjQuNDdMMjExMC44MSwxMTY0LjU1TDIxMTAuOTksMTE2NC42M0wyMTExLjE3LDExNjQuNzFMMjExMS4zNSwxMTY0LjhMMjExMS41MiwxMTY0Ljg4TDIxMTEuNjksMTE2NC45N0wyMTExLjg2LDExNjUuMDZMMjExMi4wMywxMTY1LjE1TDIxMTIuMiwxMTY1LjI0TDIxMTIuMzcsMTE2NS4zM0wyMTEyLjUzLDExNjUuNDNMMjExMi42OSwxMTY1LjUyTDIxMTIuODUsMTE2NS42MkwyMTEzLjAxLDExNjUuNzFMMjExMy4xNywxMTY1LjgxTDIxMTMuMzIsMTE2NS45MUwyMTEzLjQ4LDExNjYuMDJMMjExMy42MywxMTY2LjEyTDIxMTMuNzgsMTE2Ni4yMkwyMTEzLjkzLDExNjYuMzNMMjExNC4wNywxMTY2LjQzTDIxMTQuMjIsMTE2Ni41NEwyMTE0LjM2LDExNjYuNjVMMjExNC41LDExNjYuNzZMMjExNC42NCwxMTY2Ljg3TDIxMTQuNzgsMTE2Ni45OEwyMTE0LjkxLDExNjcuMDlMMjExNS4wNCwxMTY3LjJMMjExNS4xNywxMTY3LjMyTDIxMTUuMywxMTY3LjQ0TDIxMTUuNDMsMTE2Ny41NUwyMTE1LjU1LDExNjcuNjdMMjExNS42OCwxMTY3Ljc5TDIxMTUuOCwxMTY3LjkxTDIxMTUuOTEsMTE2OC4wM0wyMTE2LjAzLDExNjguMTVMMjExNi4xNCwxMTY4LjI4TDIxMTYuMjYsMTE2OC40TDIxMTYuMzcsMTE2OC41M0wyMTE2LjQ3LDExNjguNjVMMjExNi41OCwxMTY4Ljc4TDIxMTYuNjgsMTE2OC45MUwyMTE2Ljc4LDExNjkuMDRMMjExNi44OCwxMTY5LjE3TDIxMTYuOTcsMTE2OS4zTDIxMTcuMDcsMTE2OS40M0wyMTE3LjE2LDExNjkuNTZMMjExNy4yNSwxMTY5LjY5TDIxMTcuMzQsMTE2OS44M0wyMTE3LjQyLDExNjkuOTZMMjExNy41LDExNzAuMUwyMTE3LjU4LDExNzAuMjRMMjExNy42NiwxMTcwLjM3TDIxMTcuNzMsMTE3MC41MUwyMTE3LjgsMTE3MC42NUwyMTE3Ljg3LDExNzAuNzlMMjExNy45NCwxMTcwLjkzTDIxMTguMDEsMTE3MS4wN0wyMTE4LjA3LDExNzEuMjFMMjExOC4xMywxMTcxLjM2TDIxMTguMTgsMTE3MS41TDIxMTguMjQsMTE3MS42NEwyMTE4LjI5LDExNzEuNzlMMjExOC4zNCwxMTcxLjkzTDIxMTguMzgsMTE3Mi4wOEwyMTE4LjQzLDExNzIuMjNMMjExOC40NywxMTcyLjM4TDIxMTguNTEsMTE3Mi41MkwyMTE4LjU0LDExNzIuNjdMMjExOC41NywxMTcyLjgyTDIxMTguNjEsMTE3Mi45N0wyMTE4LjYzLDExNzMuMTJMMjExOC42NiwxMTczLjI3TDIxMTguNjgsMTE3My40MkwyMTE4LjcsMTE3My41OEwyMTE4LjcxLDExNzMuNzNMMjExOC43MywxMTczLjg4TDIxMTguNzQsMTE3NC4wNEwyMTE4Ljc0LDExNzQuMTlMMjExOC43NSwxMTc0LjM1TDIxMTguNzUsMTE3NC41TDIxMTguNzUsMTIzNy41TDE5MzEuMjYsMTIzNy41TDE5MzEuMjYsMTE3NC41TDE5MzEuMjYsMTE3NC4zNUwxOTMxLjI2LDExNzQuMTlMMTkzMS4yNywxMTc0LjA0TDE5MzEuMjgsMTE3My44OEwxOTMxLjI5LDExNzMuNzNMMTkzMS4zMSwxMTczLjU4TDE5MzEuMzMsMTE3My40MkwxOTMxLjM1LDExNzMuMjdMMTkzMS4zNywxMTczLjEyTDE5MzEuNCwxMTcyLjk3TDE5MzEuNDMsMTE3Mi44MkwxOTMxLjQ2LDExNzIuNjdMMTkzMS41LDExNzIuNTJMMTkzMS41NCwxMTcyLjM4TDE5MzEuNTgsMTE3Mi4yM0wxOTMxLjYyLDExNzIuMDhMMTkzMS42NywxMTcxLjkzTDE5MzEuNzIsMTE3MS43OUwxOTMxLjc3LDExNzEuNjRMMTkzMS44MiwxMTcxLjVMMTkzMS44OCwxMTcxLjM2TDE5MzEuOTQsMTE3MS4yMUwxOTMyLDExNzEuMDdMMTkzMi4wNiwxMTcwLjkzTDE5MzIuMTMsMTE3MC43OUwxOTMyLjIsMTE3MC42NUwxOTMyLjI3LDExNzAuNTFMMTkzMi4zNSwxMTcwLjM3TDE5MzIuNDIsMTE3MC4yNEwxOTMyLjUsMTE3MC4xTDE5MzIuNTksMTE2OS45NkwxOTMyLjY3LDExNjkuODNMMTkzMi43NiwxMTY5LjY5TDE5MzIuODUsMTE2OS41NkwxOTMyLjk0LDExNjkuNDNMMTkzMy4wMywxMTY5LjNMMTkzMy4xMywxMTY5LjE3TDE5MzMuMjIsMTE2OS4wNEwxOTMzLjMyLDExNjguOTFMMTkzMy40MywxMTY4Ljc4TDE5MzMuNTMsMTE2OC42NUwxOTMzLjY0LDExNjguNTNMMTkzMy43NSwxMTY4LjRMMTkzMy44NiwxMTY4LjI4TDE5MzMuOTcsMTE2OC4xNUwxOTM0LjA5LDExNjguMDNMMTkzNC4yMSwxMTY3LjkxTDE5MzQuMzMsMTE2Ny43OUwxOTM0LjQ1LDExNjcuNjdMMTkzNC41OCwxMTY3LjU1TDE5MzQuNywxMTY3LjQ0TDE5MzQuODMsMTE2Ny4zMkwxOTM0Ljk2LDExNjcuMkwxOTM1LjA5LDExNjcuMDlMMTkzNS4yMywxMTY2Ljk4TDE5MzUuMzcsMTE2Ni44N0wxOTM1LjUsMTE2Ni43NkwxOTM1LjY0LDExNjYuNjVMMTkzNS43OSwxMTY2LjU0TDE5MzUuOTMsMTE2Ni40M0wxOTM2LjA4LDExNjYuMzNMMTkzNi4yMywxMTY2LjIyTDE5MzYuMzgsMTE2Ni4xMkwxOTM2LjUzLDExNjYuMDJMMTkzNi42OCwxMTY1LjkxTDE5MzYuODQsMTE2NS44MUwxOTM2Ljk5LDExNjUuNzFMMTkzNy4xNSwxMTY1LjYyTDE5MzcuMzEsMTE2NS41MkwxOTM3LjQ4LDExNjUuNDNMMTkzNy42NCwxMTY1LjMzTDE5MzcuODEsMTE2NS4yNEwxOTM3Ljk3LDExNjUuMTVMMTkzOC4xNCwxMTY1LjA2TDE5MzguMzEsMTE2NC45N0wxOTM4LjQ5LDExNjQuODhMMTkzOC42NiwxMTY0LjhMMTkzOC44NCwxMTY0LjcxTDE5MzkuMDEsMTE2NC42M0wxOTM5LjE5LDExNjQuNTVMMTkzOS4zNywxMTY0LjQ3TDE5MzkuNTUsMTE2NC4zOUwxOTM5Ljc0LDExNjQuMzFMMTkzOS45MiwxMTY0LjI0TDE5NDAuMTEsMTE2NC4xNkwxOTQwLjMsMTE2NC4wOUwxOTQwLjQ4LDExNjQuMDJMMTk0MC42NywxMTYzLjk1TDE5NDAuODcsMTE2My44OEwxOTQxLjA2LDExNjMuODFMMTk0MS4yNiwxMTYzLjc1TDE5NDEuNDUsMTE2My42OEwxOTQxLjY1LDExNjMuNjJMMTk0MS44NSwxMTYzLjU2TDE5NDIuMDUsMTE2My41TDE5NDIuMjUsMTE2My40NEwxOTQyLjQ1LDExNjMuMzlMMTk0Mi42NSwxMTYzLjMzTDE5NDIuODYsMTE2My4yOEwxOTQzLjA3LDExNjMuMjNMMTk0My4yNywxMTYzLjE4TDE5NDMuNDgsMTE2My4xM0wxOTQzLjY5LDExNjMuMDhMMTk0My45LDExNjMuMDRMMTk0NC4xMSwxMTYzTDE5NDQuMzMsMTE2Mi45NUwxOTQ0LjU0LDExNjIuOTJMMTk0NC43NiwxMTYyLjg4TDE5NDQuOTcsMTE2Mi44NEwxOTQ1LjE5LDExNjIuODFMMTk0NS40MSwxMTYyLjc4TDE5NDUuNjMsMTE2Mi43NEwxOTQ1Ljg1LDExNjIuNzFMMTk0Ni4wNywxMTYyLjY5TDE5NDYuMjksMTE2Mi42NkwxOTQ2LjUxLDExNjIuNjRMMTk0Ni43NCwxMTYyLjYyTDE5NDYuOTYsMTE2Mi42TDE5NDcuMTksMTE2Mi41OEwxOTQ3LjQxLDExNjIuNTZMMTk0Ny42NCwxMTYyLjU1TDE5NDcuODcsMTE2Mi41NEwxOTQ4LjEsMTE2Mi41MkwxOTQ4LjMzLDExNjIuNTJMMTk0OC41NiwxMTYyLjUxTDE5NDguNzksMTE2Mi41TDE5NDkuMDIsMTE2Mi41TDE5NDkuMjYsMTE2Mi41TDIxMDAuNzUsMTE2Mi41Wk0xOTQ5LjEsMTE2Ni42N0wxOTQ4Ljk1LDExNjYuNjdMMTk0OC44LDExNjYuNjdMMTk0OC42NCwxMTY2LjY4TDE5NDguNDksMTE2Ni42OEwxOTQ4LjM0LDExNjYuNjlMMTk0OC4xOSwxMTY2LjdMMTk0OC4wNSwxMTY2LjcxTDE5NDcuOSwxMTY2LjcyTDE5NDcuNzUsMTE2Ni43M0wxOTQ3LjYsMTE2Ni43NEwxOTQ3LjQ2LDExNjYuNzZMMTk0Ny4zMSwxMTY2Ljc3TDE5NDcuMTcsMTE2Ni43OUwxOTQ3LjAyLDExNjYuODFMMTk0Ni44OCwxMTY2LjgzTDE5NDYuNzQsMTE2Ni44NUwxOTQ2LjYsMTE2Ni44N0wxOTQ2LjQ1LDExNjYuODlMMTk0Ni4zMSwxMTY2LjkxTDE5NDYuMTcsMTE2Ni45NEwxOTQ2LjA0LDExNjYuOTZMMTk0NS45LDExNjYuOTlMMTk0NS43NiwxMTY3LjAyTDE5NDUuNjIsMTE2Ny4wNUwxOTQ1LjQ5LDExNjcuMDhMMTk0NS4zNSwxMTY3LjExTDE5NDUuMjIsMTE2Ny4xNEwxOTQ1LjA4LDExNjcuMTdMMTk0NC45NSwxMTY3LjIxTDE5NDQuODIsMTE2Ny4yNEwxOTQ0LjY4LDExNjcuMjhMMTk0NC41NSwxMTY3LjMyTDE5NDQuNDIsMTE2Ny4zNkwxOTQ0LjI5LDExNjcuNEwxOTQ0LjE2LDExNjcuNDRMMTk0NC4wNCwxMTY3LjQ4TDE5NDMuOTEsMTE2Ny41MkwxOTQzLjc4LDExNjcuNTdMMTk0My42NiwxMTY3LjYxTDE5NDMuNTMsMTE2Ny42NUwxOTQzLjQxLDExNjcuN0wxOTQzLjI5LDExNjcuNzVMMTk0My4xNywxMTY3LjhMMTk0My4wNSwxMTY3Ljg1TDE5NDIuOTMsMTE2Ny45TDE5NDIuODEsMTE2Ny45NUwxOTQyLjY5LDExNjhMMTk0Mi41NywxMTY4LjA2TDE5NDIuNDYsMTE2OC4xMUwxOTQyLjM0LDExNjguMTZMMTk0Mi4yMywxMTY4LjIyTDE5NDIuMTIsMTE2OC4yOEwxOTQyLDExNjguMzRMMTk0MS44OSwxMTY4LjM5TDE5NDEuNzgsMTE2OC40NUwxOTQxLjY3LDExNjguNTFMMTk0MS41NywxMTY4LjU4TDE5NDEuNDYsMTE2OC42NEwxOTQxLjM2LDExNjguN0wxOTQxLjI1LDExNjguNzdMMTk0MS4xNSwxMTY4LjgzTDE5NDEuMDUsMTE2OC44OUwxOTQwLjk1LDExNjguOTZMMTk0MC44NSwxMTY5LjAzTDE5NDAuNzUsMTE2OS4xTDE5NDAuNjUsMTE2OS4xNkwxOTQwLjU2LDExNjkuMjNMMTk0MC40NiwxMTY5LjNMMTk0MC4zNywxMTY5LjM4TDE5NDAuMjgsMTE2OS40NUwxOTQwLjE5LDExNjkuNTJMMTk0MC4xLDExNjkuNTlMMTk0MC4wMSwxMTY5LjY3TDE5MzkuOTIsMTE2OS43NEwxOTM5Ljg0LDExNjkuODJMMTkzOS43NSwxMTY5Ljg5TDE5MzkuNjcsMTE2OS45N0wxOTM5LjU5LDExNzAuMDVMMTkzOS41MSwxMTcwLjEyTDE5MzkuNDMsMTE3MC4yTDE5MzkuMzUsMTE3MC4yOEwxOTM5LjI4LDExNzAuMzZMMTkzOS4yLDExNzAuNDRMMTkzOS4xMywxMTcwLjUyTDE5MzkuMDYsMTE3MC42TDE5MzguOTksMTE3MC42OUwxOTM4LjkyLDExNzAuNzdMMTkzOC44NSwxMTcwLjg1TDE5MzguNzksMTE3MC45NEwxOTM4LjcyLDExNzEuMDJMMTkzOC42NiwxMTcxLjExTDE5MzguNiwxMTcxLjE5TDE5MzguNTQsMTE3MS4yOEwxOTM4LjQ4LDExNzEuMzdMMTkzOC40MywxMTcxLjQ1TDE5MzguMzcsMTE3MS41NEwxOTM4LjMyLDExNzEuNjNMMTkzOC4yNywxMTcxLjcyTDE5MzguMjIsMTE3MS44MUwxOTM4LjE3LDExNzEuOUwxOTM4LjEyLDExNzEuOTlMMTkzOC4wOCwxMTcyLjA4TDE5MzguMDMsMTE3Mi4xN0wxOTM3Ljk5LDExNzIuMjZMMTkzNy45NSwxMTcyLjM1TDE5MzcuOTEsMTE3Mi40NUwxOTM3Ljg3LDExNzIuNTRMMTkzNy44NCwxMTcyLjYzTDE5MzcuODEsMTE3Mi43M0wxOTM3Ljc3LDExNzIuODJMMTkzNy43NCwxMTcyLjkyTDE5MzcuNzIsMTE3My4wMUwxOTM3LjY5LDExNzMuMTFMMTkzNy42NiwxMTczLjJMMTkzNy42NCwxMTczLjNMMTkzNy42MiwxMTczLjRMMTkzNy42LDExNzMuNUwxOTM3LjU4LDExNzMuNkwxOTM3LjU3LDExNzMuNjlMMTkzNy41NSwxMTczLjc5TDE5MzcuNTQsMTE3My44OUwxOTM3LjUzLDExNzMuOTlMMTkzNy41MiwxMTc0LjA5TDE5MzcuNTEsMTE3NC4xOUwxOTM3LjUxLDExNzQuM0wxOTM3LjUxLDExNzQuNEwxOTM3LjUxLDExNzQuNTFMMTkzNy41MSwxMjMzLjMzTDIxMTIuNSwxMjMzLjMzTDIxMTIuNSwxMTc0LjUxTDIxMTIuNSwxMTc0LjRMMjExMi41LDExNzQuM0wyMTEyLjQ5LDExNzQuMTlMMjExMi40OCwxMTc0LjA5TDIxMTIuNDgsMTE3My45OUwyMTEyLjQ3LDExNzMuODlMMjExMi40NSwxMTczLjc5TDIxMTIuNDQsMTE3My42OUwyMTEyLjQyLDExNzMuNkwyMTEyLjQxLDExNzMuNUwyMTEyLjM5LDExNzMuNEwyMTEyLjM2LDExNzMuM0wyMTEyLjM0LDExNzMuMkwyMTEyLjMyLDExNzMuMTFMMjExMi4yOSwxMTczLjAxTDIxMTIuMjYsMTE3Mi45MkwyMTEyLjIzLDExNzIuODJMMjExMi4yLDExNzIuNzNMMjExMi4xNywxMTcyLjYzTDIxMTIuMTMsMTE3Mi41NEwyMTEyLjA5LDExNzIuNDVMMjExMi4wNSwxMTcyLjM1TDIxMTIuMDEsMTE3Mi4yNkwyMTExLjk3LDExNzIuMTdMMjExMS45MywxMTcyLjA4TDIxMTEuODgsMTE3MS45OUwyMTExLjg0LDExNzEuOUwyMTExLjc5LDExNzEuODFMMjExMS43NCwxMTcxLjcyTDIxMTEuNjksMTE3MS42M0wyMTExLjYzLDExNzEuNTRMMjExMS41OCwxMTcxLjQ1TDIxMTEuNTIsMTE3MS4zN0wyMTExLjQ3LDExNzEuMjhMMjExMS40MSwxMTcxLjE5TDIxMTEuMzQsMTE3MS4xMUwyMTExLjI4LDExNzEuMDJMMjExMS4yMiwxMTcwLjk0TDIxMTEuMTUsMTE3MC44NUwyMTExLjA5LDExNzAuNzdMMjExMS4wMiwxMTcwLjY5TDIxMTAuOTUsMTE3MC42TDIxMTAuODgsMTE3MC41MkwyMTEwLjgsMTE3MC40NEwyMTEwLjczLDExNzAuMzZMMjExMC42NSwxMTcwLjI4TDIxMTAuNTcsMTE3MC4yTDIxMTAuNSwxMTcwLjEyTDIxMTAuNDIsMTE3MC4wNUwyMTEwLjM0LDExNjkuOTdMMjExMC4yNSwxMTY5Ljg5TDIxMTAuMTcsMTE2OS44MkwyMTEwLjA4LDExNjkuNzRMMjExMCwxMTY5LjY3TDIxMDkuOTEsMTE2OS41OUwyMTA5LjgyLDExNjkuNTJMMjEwOS43MywxMTY5LjQ1TDIxMDkuNjQsMTE2OS4zOEwyMTA5LjU0LDExNjkuM0wyMTA5LjQ1LDExNjkuMjNMMjEwOS4zNSwxMTY5LjE2TDIxMDkuMjYsMTE2OS4xTDIxMDkuMTYsMTE2OS4wM0wyMTA5LjA2LDExNjguOTZMMjEwOC45NiwxMTY4Ljg5TDIxMDguODYsMTE2OC44M0wyMTA4Ljc1LDExNjguNzdMMjEwOC42NSwxMTY4LjdMMjEwOC41NCwxMTY4LjY0TDIxMDguNDQsMTE2OC41OEwyMTA4LjMzLDExNjguNTFMMjEwOC4yMiwxMTY4LjQ1TDIxMDguMTEsMTE2OC4zOUwyMTA4LDExNjguMzRMMjEwNy44OSwxMTY4LjI4TDIxMDcuNzgsMTE2OC4yMkwyMTA3LjY2LDExNjguMTZMMjEwNy41NSwxMTY4LjExTDIxMDcuNDMsMTE2OC4wNkwyMTA3LjMyLDExNjhMMjEwNy4yLDExNjcuOTVMMjEwNy4wOCwxMTY3LjlMMjEwNi45NiwxMTY3Ljg1TDIxMDYuODQsMTE2Ny44TDIxMDYuNzIsMTE2Ny43NUwyMTA2LjU5LDExNjcuN0wyMTA2LjQ3LDExNjcuNjVMMjEwNi4zNSwxMTY3LjYxTDIxMDYuMjIsMTE2Ny41N0wyMTA2LjEsMTE2Ny41MkwyMTA1Ljk3LDExNjcuNDhMMjEwNS44NCwxMTY3LjQ0TDIxMDUuNzEsMTE2Ny40TDIxMDUuNTgsMTE2Ny4zNkwyMTA1LjQ1LDExNjcuMzJMMjEwNS4zMiwxMTY3LjI4TDIxMDUuMTksMTE2Ny4yNEwyMTA1LjA2LDExNjcuMjFMMjEwNC45MiwxMTY3LjE3TDIxMDQuNzksMTE2Ny4xNEwyMTA0LjY2LDExNjcuMTFMMjEwNC41MiwxMTY3LjA4TDIxMDQuMzgsMTE2Ny4wNUwyMTA0LjI1LDExNjcuMDJMMjEwNC4xMSwxMTY2Ljk5TDIxMDMuOTcsMTE2Ni45NkwyMTAzLjgzLDExNjYuOTRMMjEwMy42OSwxMTY2LjkxTDIxMDMuNTUsMTE2Ni44OUwyMTAzLjQxLDExNjYuODdMMjEwMy4yNywxMTY2Ljg1TDIxMDMuMTIsMTE2Ni44M0wyMTAyLjk4LDExNjYuODFMMjEwMi44NCwxMTY2Ljc5TDIxMDIuNjksMTE2Ni43N0wyMTAyLjU1LDExNjYuNzZMMjEwMi40LDExNjYuNzRMMjEwMi4yNSwxMTY2LjczTDIxMDIuMTEsMTE2Ni43MkwyMTAxLjk2LDExNjYuNzFMMjEwMS44MSwxMTY2LjdMMjEwMS42NiwxMTY2LjY5TDIxMDEuNTEsMTE2Ni42OEwyMTAxLjM2LDExNjYuNjhMMjEwMS4yMSwxMTY2LjY3TDIxMDEuMDYsMTE2Ni42N0wyMTAwLjksMTE2Ni42N0wyMTAwLjczLDExNjYuNjdMMTk0OS4yOCwxMTY2LjY3TDE5NDkuMSwxMTY2LjY3WiIgc3R5bGU9ImZpbGw6cmdiKDIwMCw1OSw4MCk7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwwLjc1LDAuMDAyMzczNjYsMjkwLjYyNSkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMTE4Ljc1LDExNjIuNUwxOTMxLjI2LDExNjIuNUwxOTMxLjI2LDEyMjUuNUMxOTMxLjI2LDEyMjguNjggMTkzMi4yLDEyMzEuNzQgMTkzMy44OSwxMjMzLjk5QzE5MzUuNTgsMTIzNi4yNCAxOTM3Ljg3LDEyMzcuNSAxOTQwLjI2LDEyMzcuNUMxOTcxLjkzLDEyMzcuNSAyMDc4LjA3LDEyMzcuNSAyMTA5Ljc1LDEyMzcuNUMyMTEyLjE0LDEyMzcuNSAyMTE0LjQzLDEyMzYuMjQgMjExNi4xMSwxMjMzLjk5QzIxMTcuOCwxMjMxLjc0IDIxMTguNzUsMTIyOC42OCAyMTE4Ljc1LDEyMjUuNUMyMTE4Ljc1LDEyMDQuMzIgMjExOC43NSwxMTYyLjUgMjExOC43NSwxMTYyLjVaIiBzdHlsZT0iZmlsbDpyZ2IoMjAwLDU5LDgwKTsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMC4wMDQ3NDczMSwxLjM2NDI0ZS0xMSkiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjE5NTAiIGN5PSIxMTYyLjUiIHI9IjE4Ljc1IiBzdHlsZT0iZmlsbDpyZ2IoMjAwLDU5LDgwKTsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMC4wMDQ3NDczMSwxLjM2NDI0ZS0xMSkiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjE5ODcuNSIgY3k9IjExNjIuNSIgcj0iMTguNzUiIHN0eWxlPSJmaWxsOndoaXRlOyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwwLjAwNDc0NzMxLDEuMzY0MjRlLTExKSI+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjAyNSIgY3k9IjExNjIuNSIgcj0iMTguNzUiIHN0eWxlPSJmaWxsOnJnYigyMDAsNTksODApOyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwzNy41MDQ3LDEuMzY0MjRlLTExKSI+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMjAyNSIgY3k9IjExNjIuNSIgcj0iMTguNzUiIHN0eWxlPSJmaWxsOndoaXRlOyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSw3NSwxLjM2NDI0ZS0xMSkiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjIwMjUiIGN5PSIxMTYyLjUiIHI9IjE4Ljc1IiBzdHlsZT0iZmlsbDpyZ2IoMjAwLDU5LDgwKTsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDAuNzUsMCwyOTAuNjI1KSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgeD0iMTk2OC43NiIgeT0iMTE2Mi41IiB3aWR0aD0iMzcuNSIgaGVpZ2h0PSI3NSIgc3R5bGU9ImZpbGw6d2hpdGU7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwwLjc1LDAsMjkwLjYyNSkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9IjIwNDMuNzYiIHk9IjExNjIuNSIgd2lkdGg9IjM3LjUiIGhlaWdodD0iNzUiIHN0eWxlPSJmaWxsOndoaXRlOyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K`;
    rightPlacement: NgxFloatUiPlacements = NgxFloatUiPlacements.RIGHT;
    topPlacement: NgxFloatUiPlacements = NgxFloatUiPlacements.TOP;


    onPopperUpdate($event): void {
    }
}

const utils = {
    arrowClazz: "float-ui-arrow",
    containerClazz: "float-ui-container",
    expectPopperHidden(popperDebugEl: DebugElement) {
        const popperContent = utils.getClosestPopperContainer(popperDebugEl);
        expect(popperContent).not.toBeNull();
        expect(popperContent.offsetParent).toBeNull();
    },
    expectPopperVisible(popperDebugEl: DebugElement) {
        const popperContent = utils.getClosestPopperContainer(popperDebugEl);
        expect(popperContent).not.toBeNull();
        expect(popperContent.offsetParent).toBeTruthy();
    },
    getClosestPopperContainer(el: DebugElement): HTMLElement | null {
        return el.nativeElement?.parentElement?.querySelector(`.${utils.containerClazz}`);
    },
    getPopperArrow(el: DebugElement): HTMLElement | null {
        return utils.getClosestPopperContainer(el).querySelector(`.${utils.arrowClazz}`);
    }
};
let fixture: ComponentFixture<NgxFloatUiDirectiveTestComponent>;
let poppers: DebugElement[];

beforeEach(() => {
    fixture = TestBed.configureTestingModule({
            imports: [
                NgxFloatUiModule,
                NgxFloatUiDirectiveTestComponent
            ]
        })
        .createComponent(NgxFloatUiDirectiveTestComponent);
    fixture.detectChanges(); // initial binding
    // all elements with an attached NgxPopperjsDirective
    poppers = fixture.debugElement.queryAll(By.directive(NgxFloatUiDirective));
});

afterEach(fakeAsync(() => {
    flush();
}));

it("should count test popper elements", () => {
    expect(poppers.length).toBe(4);
});

it("should have popper sibling", () => {
    const popperContent: HTMLElement = poppers[0].nativeElement.parentElement.querySelector("float-ui-content");
    expect(popperContent).not.toBeNull();
});

it("should show popper on start", () => {
    fakeAsync(() => {
        tick();
        utils.expectPopperVisible(poppers[0]);
    });
});

it("should show popper on click", () => {
    poppers[1].nativeElement.click();
    fakeAsync(() => {
        utils.expectPopperVisible(poppers[1]);
    });
});

it("should hide popper on click outside", fakeAsync(() => {
    const fooButtonDebugEl = fixture.debugElement.query(By.css("[foo]"));
    fooButtonDebugEl.nativeElement.click();
    utils.expectPopperHidden(poppers[0]);
}));

it("should have popper with position fixed", fakeAsync(() => {
    let popperContent;
    let computedStyle;
    setTimeout(() => {
        popperContent = utils.getClosestPopperContainer(poppers[2]);
        computedStyle = window.getComputedStyle(popperContent);
    });
    tick();
    expect(computedStyle.position).toBe("fixed");
}));

it("should have popper placed on the right", fakeAsync(() => {
    let popperClientRect;
    let popperArrowClientRect;
    setTimeout(() => {
        popperClientRect = poppers[3].nativeElement.getBoundingClientRect();
        popperArrowClientRect = utils.getPopperArrow(poppers[3]).getBoundingClientRect();
    });
    tick();
    expect(Math.ceil(popperArrowClientRect.x)).toBeLessThanOrEqual(popperClientRect.x);
}));

