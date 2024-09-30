import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination() {
  return (
    <div className="flex items-center justify-center border-t border-gray-800 py-3 sm:px-6">
      <nav
        aria-label="Pagination"
        className="isolate inline-flex -space-x-px rounded-md bg-neutral-700 bg-opacity-40 shadow-sm"
      >
        <a
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-indigo-400 focus:z-20 focus:outline-offset-0  dark:hover:bg-indigo-500 dark:hover:bg-opacity-40"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
        </a>
        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-700 hover:bg-gray-50 focus:outline-offset-0" */}
        <a
          href="#"
          aria-current="page"
          className="relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:bg-opacity-40"
        >
          1
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-indigo-400  focus:z-20 focus:outline-offset-0  dark:hover:bg-indigo-500  dark:hover:bg-opacity-40"
        >
          2
        </a>
        <a
          href="#"
          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1  ring-inset ring-gray-700 hover:bg-indigo-400  focus:z-20 focus:outline-offset-0 md:inline-flex  dark:hover:bg-indigo-500  dark:hover:bg-opacity-40"
        >
          3
        </a>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-700 hover:bg-indigo-400  focus:outline-offset-0  dark:hover:bg-indigo-500">
          ...
        </span>
        <a
          href="#"
          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1  ring-inset ring-gray-700 hover:bg-indigo-400  focus:z-20 focus:outline-offset-0 md:inline-flex  dark:hover:bg-indigo-500  dark:hover:bg-opacity-40"
        >
          8
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1  ring-inset ring-gray-700 hover:bg-indigo-400  focus:z-20 focus:outline-offset-0  dark:hover:bg-indigo-500  dark:hover:bg-opacity-40"
        >
          9
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1  ring-inset ring-gray-700 hover:bg-indigo-400  focus:z-20 focus:outline-offset-0  dark:hover:bg-indigo-500  dark:hover:bg-opacity-40"
        >
          10
        </a>
        <a
          href="#"
          className="relative inline-flex items-center rounded-r-md  px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700  hover:bg-indigo-400 focus:z-20 focus:outline-offset-0 dark:hover:bg-indigo-500  dark:hover:bg-opacity-40"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
        </a>
      </nav>
    </div>
  );
}
