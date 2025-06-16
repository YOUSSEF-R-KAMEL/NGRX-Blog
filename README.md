# NGRX-Blog

A modern Angular application built with NgRx state management, featuring a blog management system with CRUD operations.

## 🚀 Features

- **Angular 19** with standalone components
- **NgRx** for state management
- **PrimeNG** UI components with Aura Dark theme
- **JSON Server** for mock API
- **Toastr** for notifications
- **Ngx Spinner** for loading states
- **Responsive design** with PrimeFlex
- **TypeScript** for type safety

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v19)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <(https://github.com/YOUSSEF-R-KAMEL/NGRX-Blog)>
   cd NGRX-Blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the JSON Server** (in a separate terminal)
   ```bash
   npm run json-server
   ```
   This will start the mock API on `http://localhost:3001`

4. **Start the development server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/
├── app/
│   ├── Components/
│   │   └── blog/                 # Blog management component
│   │   ├── pages/
│   │   │   ├── home/                 # Home page
│   │   │   └── counter/              # Counter demo page
│   │   ├── shared/
│   │   │   ├── navbar/               # Navigation component
│   │   │   ├── loading-spinner/      # Loading spinner component
│   │   │   └── services/             # Shared services
│   │   ├── store/
│   │   │   ├── actions/              # NgRx actions
│   │   │   ├── effects/              # NgRx effects
│   │   │   ├── reducers/             # NgRx reducers
│   │   │   ├── selectors/            # NgRx selectors
│   │   │   └── models/               # TypeScript interfaces
│   │   └── app.component.ts          # Root component
│   ├── assets/                       # Static assets
│   └── styles.scss                   # Global styles
```

## 🎯 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production optimizations
- `npm run build:analyze` - Build with bundle analysis
- `npm run json-server` - Start JSON Server for mock API
- `npm run json-server:watch` - Start JSON Server with external access
- `npm test` - Run unit tests

## 🎨 Theming

The application uses **PrimeNG Aura Dark** theme. To change themes:

1. **Light Theme**: Update `angular.json`
   ```json
   "node_modules/@primeng/themes/aura/aura-light.css"
   ```

2. **Dark Theme**: Update `angular.json`
   ```json
   "node_modules/@primeng/themes/aura/aura-dark.css"
   ```

## 📊 State Management

The application uses NgRx for state management:

- **Actions**: Define what can happen in the app
- **Reducers**: Handle state changes
- **Effects**: Handle side effects (API calls)
- **Selectors**: Extract data from state

### Blog State Structure
```typescript
interface IBlog {
  id: number;
  title: string;
  description: string;
}
```

## 🔧 Configuration

### Angular Configuration
- **Bundle Budget**: 1.5MB warning, 2MB error
- **Optimization**: Enabled for production builds
- **Source Maps**: Disabled in production

### JSON Server Configuration
- **Port**: 3001
- **Database**: `db.json`
- **Auto-watch**: Enabled

## 🚀 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Angular and build the project

### Important Notes for Deployment
- **JSON Server**: Not available on Vercel (static hosting)
- **Backend**: Use a cloud database service (Supabase, Firebase, etc.)
- **API URL**: Update environment variables for production

## 🔄 API Endpoints

When running JSON Server locally:
- `GET /blogs` - Get all blogs
- `GET /blogs/:id` - Get specific blog
- `POST /blogs` - Create new blog
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

## 🎯 Features Demo

### Blog Management
- View all blogs
- Add new blogs
- Edit existing blogs
- Delete blogs with confirmation
- Error handling for server connection

### Counter Application
- Increment/decrement counter
- Custom value operations
- Welcome message functionality
- State persistence with NgRx

## 🛠️ Development

### Adding New Features
1. Create actions in `store/actions/`
2. Add reducers in `store/reducers/`
3. Implement effects in `store/effects/`
4. Create selectors in `store/selectors/`
5. Update components to use new state

### Styling
- Use PrimeFlex utility classes
- Custom styles in component SCSS files
- Global styles in `src/styles.scss`

## 📝 Environment Variables

Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001'
};
```


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **JSON Server not running**
   - Run `npm run json-server` in a separate terminal
   - Check if port 3001 is available

2. **Build errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Angular version compatibility

3. **Theme not loading**
   - Verify theme path in `angular.json`
   - Check if `@primeng/themes` is installed

4. **State not updating**
   - Check NgRx DevTools in browser
   - Verify action dispatching in components

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review NgRx and Angular documentation

---

**Happy Coding! 🎉**
