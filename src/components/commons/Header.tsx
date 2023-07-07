import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header>
        <nav>
          <Link className="hover-effect" href="/">
            Home
          </Link>
          <Link className="hover-effect" href="/">
            <Image
              width={279}
              height={38}
              priority
              src="/movieverse.svg"
              alt={"Movie Verse Logo"}
            ></Image>
          </Link>
          <Link className="hover-effect" href="/favorite-pages">
            Favorites
          </Link>
        </nav>
      </header>
    </>
  );
};
