export default function Card(props = { className: 'col-span-2' }) {
  return (
    <div
      className={
        props.className +
        ' flex flex-col justify-start border border-gray-200 rounded-md shadow-md bg-white'
      }>
      <header className='flex items-start justify-between py-2 px-4 border-b border-solid border-gray-200'>
        <h3 className='text-xl font-semibold text-gray-900'>{props.header}</h3>
      </header>
      <section className='flex-grow flex flex-col justify-evenly px-6'>
        {props.children}
      </section>
    </div>
  );
}
