import Link from "next/link";

export default function Header() {
  return (
    <header className=" bg-blue-600" id="header">
      <div className=" py-4 px-6 sm:w-4/6 mx-auto">
        <div className="p-2 border-2 w-max">
          <h1 className="text-lg font-bold text-white underline underline-offset-2">
            SanberDialy.
          </h1>
        </div>
      </div>
    </header>
  );
}
