const calculateMillisecondsUntilNextFiveMinuteInterval = () => {
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.valueOf() + 30000);
  const minuteValueForNextFiveMinuteInterval = 5 * Math.ceil(fiveMinutesFromNow.getMinutes() / 5);

  const nextFiveMinueInterval = new Date(fiveMinutesFromNow.valueOf());
  nextFiveMinueInterval.setMinutes(minuteValueForNextFiveMinuteInterval);
  nextFiveMinueInterval.setSeconds(0);
  nextFiveMinueInterval.setMilliseconds(0);

  return nextFiveMinueInterval.valueOf() - now.valueOf();
};

export default calculateMillisecondsUntilNextFiveMinuteInterval;
