export default function Card(props) {
  return (
    <div
      className={
        props.className +
        ' mb-2 mr-3 flex flex-col justify-start border border-gray-300 rounded-md shadow-md bg-white'
      }
    >
      <header className="flex items-start justify-between py-0.5 px-1 border-b border-gray-200">
        <h3 className="pointer-events-none text-xs font-semibold text-gray-900">
          {props.header}
        </h3>
      </header>
      <section className="flex-grow flex flex-col justify-evenly my-0.5 px-1">
        {props.children}
      </section>
    </div>
  );
}
