import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HistoricalChart from "./components/HistoricalChart";
import History from "./components/History";
import LiveChart from "./components/LiveChart";
import Loading from "./components/Loading";
import Overview from "./components/Overview";
import useNumberFormatter from "./features/useNumberFormatter";
import { fetchOverviewData, fetchHistoricalData, fetchCurrentPrice } from './api/cryptoApi'

export {
    Dashboard, Footer, Header, HistoricalChart, History, LiveChart,
    Loading, Overview, useNumberFormatter, fetchCurrentPrice, fetchOverviewData, fetchHistoricalData
}