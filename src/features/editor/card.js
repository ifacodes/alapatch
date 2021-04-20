export default function Card(props) {
  return (
    <div
      className={
        props.className +
        ' mb-4 mr-4 flex flex-col justify-start border border-gray-300 rounded-md shadow-md bg-white'
      }
    >
      <header className="flex items-start justify-between py-2 px-4 border-b border-solid border-gray-200">
        <h3 className="pointer-events-none text-xl font-semibold text-gray-900">
          {props.header}
        </h3>
      </header>
      <section className="flex-grow flex flex-col justify-evenly my-3 px-6">
        {props.children}
      </section>
    </div>
  );
}
