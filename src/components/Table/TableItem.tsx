export function TableItem() {
  return (
    <div className="flex items-center gap-8 px-6 py-3 border-b border-gray-800 hover:bg-gray-800 hover:cursor-pointer transition-colors duration-100">
      <input
        type="checkbox"
      />

      <img
        className="h-10 w-10 object-cover rounded-full"
        src="https://www.datocms-assets.com/63026/1651245604-mediafy-mobile.png"
        alt=""
      />

      <span className="flex-1">TailwindCSS</span>

      <time>01/06/2022</time>
    </div>
  );
}