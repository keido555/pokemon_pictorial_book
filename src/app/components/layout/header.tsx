import Head from "next/head";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="fixed left-0 top-0 flex w-full justify-around border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="text-3xl font-serif">POKEMON</h1>
      <div className="flex justify-around w-80">
        <Link href="/" className="my-auto font-serif">
          HOME
        </Link>
        <Link href="/random" className="my-auto font-serif">
          RANDOM PARTY
        </Link>
      </div>
    </div>
  );
};
