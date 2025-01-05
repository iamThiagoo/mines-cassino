import { FaMoneyBillTransfer } from "react-icons/fa6";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CurrencyInput = ({ value, onChange }: CurrencyInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
          <FaMoneyBillTransfer className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="number"
          id="currency-input"
          className="block p-2.5 w-full z-20 ps-12 text-sm text-white rounded-s-lg bg-gray-800 border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-400 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500  outline-none"
          placeholder="Inserir Valor"
          value={value}
          onChange={handleChange}
          required
        />
      </div>
      <div
        id="dropdown-currency-button"
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm  font-medium text-center bg-gray-800 text-white border border-gray-300 rounded-e-lg"
      >
        <svg
          fill="none"
          aria-hidden="true"
          className="h-4 w-4 me-2"
          viewBox="0 0 20 15"
        >
          <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          <mask
            id="a"
            style={{ maskType: "luminance" }}
            width="20"
            height="15"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
          >
            <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          </mask>
          <g mask="url(#a)">
            <path
              fill="#D02F44"
              fillRule="evenodd"
              d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
              clipRule="evenodd"
            />
            <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
          </g>
        </svg>
        USD
      </div>
    </div>
  );
};

export default CurrencyInput;
