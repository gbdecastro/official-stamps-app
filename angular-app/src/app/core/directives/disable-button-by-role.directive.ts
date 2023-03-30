import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    Renderer2,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
    selector: '[appDisableButtonByRole]',
})
export class DisableButtonByRoleDirective implements AfterViewInit, OnDestroy {
    @Input('appDisableButtonByRole') role: string = '';
    @Input() delay = 10;

    private myPopup: any;
    private timer: any;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private authService: AuthService
    ) {}

    ngAfterViewInit(): void {
        if (!this.authService.getRoles().includes(this.role)) {
            this.el.nativeElement
                .querySelector('button')
                .setAttribute('disabled', 'true');

            const self = this;
            this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
                self.onMouseEnter();
            });

            this.renderer.listen(this.el.nativeElement, 'mouseleave', () => {
                self.onMouseLeave();
            });
        }
    }

    ngOnDestroy(): void {
        if (this.myPopup) {
            this.myPopup.remove();
        }
    }

    private onMouseEnter(): void {
        this.timer = setTimeout(() => {
            let x =
                this.el.nativeElement.getBoundingClientRect().left +
                this.el.nativeElement.offsetWidth * 2;
            let y =
                this.el.nativeElement.getBoundingClientRect().top +
                this.el.nativeElement.offsetHeight * 0.35;
            this.createTooltipPopup(x, y);
        }, this.delay);
    }

    private onMouseLeave(): void {
        if (this.timer) clearTimeout(this.timer);
        if (this.myPopup) {
            this.myPopup.remove();
        }
    }

    private createTooltipPopup(x: number, y: number) {
        let popup = document.createElement('div');
        popup.innerHTML = 'Not Authorized';
        popup.setAttribute('class', 'tooltip-container');
        popup.style.top = y.toString() + 'px';
        popup.style.left = x.toString() + 'px';
        document.body.appendChild(popup);
        this.myPopup = popup;
        setTimeout(() => {
            if (this.myPopup) this.myPopup.remove();
        }, 5000);
    }
}
