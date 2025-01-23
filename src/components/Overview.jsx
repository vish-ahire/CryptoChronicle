import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOverviewData } from '../redux/cryptoSlice';
import { useNumberFormatter, fetchOverviewData , Loading} from '../index'

const Overview = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto);
  const overviewData = useSelector((state) => state.crypto.overviewData);
  const { formatNumber } = useNumberFormatter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOverviewData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchOverviewData(selectedCrypto);
        if (data == null) return;

        dispatch(setOverviewData(data));
      } catch (err) {
        setError('Failed to fetch overview data. Please try again later. Too many attempts.');
      } finally {
        setLoading(false);
      }
    };

    getOverviewData();
  }, [selectedCrypto, dispatch]);

  const convertZuluToIST = (zuluTimeString) => {
    const zuluDate = new Date(zuluTimeString);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(zuluDate.getTime() + istOffset);
    return istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };


  const cardStyle = 'bg-white shadow-lg rounded-lg p-6';
  const darkCardStyle = 'dark:bg-gray-800 dark:text-white dark:shadow-[0_4px_6px_0px_#00bcd4]';

  const textStyle = 'text-xl text-gray-800 dark:text-gray-300';
  const headingStyle = 'text-lg font-semibold text-gray-800 dark:text-white';

  if (loading) return <Loading />;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-screen-lg mx-auto dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">{overviewData.name} Overview</h2>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Market Cap */}
        <div className={`${cardStyle} ${darkCardStyle}`}>
          <h3 className={headingStyle}>Market Cap</h3>
          <p className={textStyle}>${formatNumber(overviewData.market_data.market_cap.usd)}</p>
        </div>

        {/* Total Supply */}
        <div className={`${cardStyle} ${darkCardStyle}`}>
          <h3 className={headingStyle}>Total Supply</h3>
          <p className={textStyle}>{formatNumber(overviewData.market_data.total_supply)}</p>
        </div>

        {/* Circulating Supply */}
        <div className={`${cardStyle} ${darkCardStyle}`}>
          <h3 className={headingStyle}>Circulating Supply</h3>
          <p className={textStyle}>{formatNumber(overviewData.market_data.circulating_supply)}</p>
        </div>

        {/* All-time High */}
        <div className={`${cardStyle} ${darkCardStyle}`}>
          <h3 className={headingStyle}>All-time High</h3>
          <p className={textStyle}>${formatNumber(overviewData.market_data.ath.usd)}</p>
        </div>

        {/* High (24h) */}
        <div className={`${cardStyle} ${darkCardStyle}`}>
          <h3 className={headingStyle}>High (24h)</h3>
          <p className={textStyle}>{formatNumber(overviewData.market_data.high_24h.aed)}</p>
        </div>

        {/* Low (24h) */}
        <div className={`${cardStyle} ${darkCardStyle}`}>
          <h3 className={headingStyle}>Low (24h)</h3>
          <p className={textStyle}>{formatNumber(overviewData.market_data.low_24h?.aed)}</p>
        </div>

        {/* Last Updated */}
        <div className={`${cardStyle} ${darkCardStyle} col-span-1 sm:col-span-2 lg:col-span-3`}>
          <h3 className={headingStyle}>Last Updated</h3>
          <p className={textStyle}>{convertZuluToIST(overviewData.last_updated)}</p>
        </div>
      </div>

      {/* About Section */}
      <div className={`${cardStyle} ${darkCardStyle}`}>
        <h3 className={headingStyle}>About</h3>
        <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: overviewData.description.en }}></div>
      </div>
    </div>
  );
};

export default Overview;
