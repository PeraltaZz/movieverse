import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header className="header-bg">
        <nav className="header-nav container d-flex justify-content-between align-items-center">
          <Link className="hover-effect" href="/">
            Home
          </Link>
          <Link className="hover-effect d-flex justify-content-center align-items-center" href="/">
            <Image
           className="logo-image"
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
