import { findCountryByCode } from "@/utils/countries";
import ReactCountryFlag from "react-country-flag";

function CountryFlagAndName({ countryCode }: { countryCode: string }) {
  const validCountry = findCountryByCode(countryCode)!;
  const countryName =
    validCountry!.name.length > 20
      ? `${validCountry!.name.substring(0, 20)}...`
      : validCountry!.name;
  return (
    <span className="flex justify-start items-center gap-2 text-sm">
      <ReactCountryFlag countryCode={countryCode} svg />
      {countryName}
    </span>
  );
}

export default CountryFlagAndName;
