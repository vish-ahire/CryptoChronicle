Here's the updated README file with a section dedicated to the table feature in your application:

---

# CryptoChronicle 
Tracking the historical and current narrative of cryptocurrencies

A comprehensive cryptocurrency dashboard built with React, Redux, and Chart.js to provide real-time data, historical insights, and market overviews for selected cryptocurrencies. The application supports both light and dark themes, dynamic animations, and a responsive design.

---

## Features

### 1. Real-Time Data
- Live chart displaying the price updates of a selected cryptocurrency via WebSocket.

### 2. Historical Data
- View historical data for selected cryptocurrencies over custom timeframes (1 day, 7 days, 30 days, and 90 days).
- Multi-type chart combining line and bar visuals for price, market cap, and volume.

### 3. Market Overview
- Comprehensive overview of a cryptocurrency including:
  - Market Cap
  - Total Supply
  - Circulating Supply
  - All-time High
  - 24-hour High and Low
  - Last Updated

### 4. Interactive Table
- **Historical Data Table**:
  - Displays historical prices, dates, and times for the selected cryptocurrency.
  - Fully supports light and dark themes, with dynamic styling for table headers and content.
  - Pagination support with adjustable rows per page (10, 20, 50).
  - Responsive and user-friendly design for seamless interaction.

### 5. Theming
- Fully supports light and dark modes.
- Theme customization is centralized for easy management.

### 6. Loading Animations
- Custom loading animations to enhance the user experience.

### 7. Modular Structure
- Reusable components for headers, cards, and charts.
- Centralized exports for cleaner imports.

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd crypto-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Usage

1. Select a cryptocurrency from the dropdown menu.
2. View real-time price updates on the live chart.
3. Switch to the "History" tab to explore historical data with customizable timeframes.
4. View market overviews for detailed insights.
5. Interact with the historical data table to analyze price trends.
6. Toggle between light and dark themes using the theme switcher.

---

## Customization

### Adding New Features
- Create new components in the `components/` folder.
- Add new Redux slices in the `redux/` folder for state management.
- Integrate API calls in the `api/` folder.

### Modifying the Table
- Update columns, styles, or features in the `History` component.
- Customize table styling in light or dark themes using Tailwind CSS or Material-UI class overrides.

---

## Technologies Used

- **React**: Frontend framework for building UI.
- **Redux**: State management.
- **Chart.js**: Data visualization library.
- **Material-UI DataGrid**: Interactive table for historical data.
- **Tailwind CSS**: Styling.
- **WebSocket**: Real-time data updates.
- **CoinCap / CoinGecko API**: Cryptocurrency data.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- [CoinCap API](https://coincap.io/) for providing real-time and historical cryptocurrency data.
- [React Chart.js 2](https://react-chartjs-2.js.org/) for powerful and easy-to-use charting capabilities.
- [Material-UI DataGrid](https://mui.com/components/data-grid/) for creating interactive tables.
- [Tailwind CSS](https://tailwindcss.com/) for fast and responsive design.

