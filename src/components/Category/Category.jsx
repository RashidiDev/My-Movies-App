export default function Category() {
  return (
    <div>
      <form action="">
        <label
          className="text-sm font-medium md:text-base dark:text-white"
          htmlFor="sort"
        >
          Sort By:
        </label>
        <select
          name="sortSelect"
          id="sortSelection"
          className="relative z-0 ml-2 w-32 cursor-pointer rounded-md border border-neutral-300 bg-neutral-50 p-1 text-sm outline-none md:w-36 md:p-2 md:text-base dark:border-neutral-700 dark:bg-neutral-800"
        >
          <option value="date">Date Added</option>
          <option value="year">Year</option>
          <option value="name">Name</option>
          <option value="score">Score</option>
        </select>
      </form>
    </div>
  );
}
