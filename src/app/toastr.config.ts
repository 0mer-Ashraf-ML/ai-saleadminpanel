import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const provideToastrConfig = () => [
  provideAnimations(),
  provideToastr({
    closeButton: true,
  }),
];