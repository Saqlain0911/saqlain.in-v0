# Saqlain Sheikh - Portfolio (React Version)

A modern, responsive portfolio website built with React.js featuring a clean design and smooth interactions.

## Features

- **Modern React Architecture**: Built with functional components and hooks
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Theme**: Elegant dark design with orange accent colors
- **Interactive Modals**: Smooth modal windows for different sections
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance Optimized**: Fast loading with optimized animations

## Sections

- **Hero**: Main landing section with your name and call-to-action
- **Resume**: Professional experience, skills, and education
- **About**: Personal introduction and what you do
- **Contact**: Contact information and social links
- **Portfolio**: Showcase of your projects and work

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saqlain-portfolio-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Header.js      # Navigation header
│   ├── Hero.js        # Main hero section
│   ├── Footer.js      # Social links footer
│   └── Modal.js       # Modal component
├── App.js             # Main app component
├── index.js           # React entry point
└── index.css          # Global styles and design system
```

## Customization

### Personal Information
Update the content in `src/App.js` in the `getModalContent` function to customize:
- Resume information
- Contact details
- About section
- Portfolio projects

### Styling
The design system is defined in `src/index.css` with CSS custom properties for easy theming.

### Social Links
Update the social media links in `src/components/Footer.js`.

## Technologies Used

- **React 18**: Modern React with hooks
- **CSS3**: Custom design system with CSS variables
- **JavaScript ES6+**: Modern JavaScript features
- **Google Fonts**: Typography (Inter, Alfa Slab One, Georgia)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Saqlain Sheikh
- Email: saqlain@example.com
- LinkedIn: [linkedin.com](https://linkedin.com)
- GitHub: [github.com](https://github.com)
