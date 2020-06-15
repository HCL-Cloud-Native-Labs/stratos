/*
 * Public API Surface of core
 */

// export * from './app.module';

// Extensions
export * from './core/extension/extension-service';
export * from './core/extension/extension-types';

// Customization
export * from './core/customizations.types';

// Modules
export * from './core/core.module';
export * from './core/md.module';
export * from './shared/shared.module';

// LoginPageComponent
export { LoginPageComponent } from './features/login/login-page/login-page.component';

// Main App
export * from './app.module';
export * from './app.component';