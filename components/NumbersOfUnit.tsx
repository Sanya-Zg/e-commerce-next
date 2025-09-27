'use client';
const NumbersOfUnit = () => {
  const handleMinus = () => {};
  const handlePlus = () => {};
  return (
    <div className="border border-gray-light w-[123px] h-10 sm:h-16 rounded-[10px] grid grid-cols-3 justify-between items-center">
      <button
        className="block h-full rounded-tl-[10px] rounded-bl-[10px] hover:bg-gray-100 active:bg-gray-50 hoverEffect"
        onClick={handleMinus}
      >
        -
      </button>
      <span className="mx-auto">1</span>
      <button
        className="block h-full rounded-tr-[10px] rounded-br-[10px] hover:bg-gray-100 active:bg-gray-50 hoverEffect"
        onClick={handlePlus}
      >
        +
      </button>
    </div>
  );
};
export default NumbersOfUnit;
