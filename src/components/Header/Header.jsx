import MenuHeader from "../Menu";
import HamburgerMenu from "../HamburgerMenu";
import useWindowSize from "../../hooks/useWindowSize";

const Header = () => {
  const { width } = useWindowSize();

  return (
    <>
      <header className="header">
        {width >= 1090 && (
          <div className="header__group">
            {/* <ViewTitle /> */}
            title
          </div>
        )}
        <div className="header__group">
          <HamburgerMenu />
          {width < 1090 && "logo"}
          {/* <Notifications /> */}
          {/* <PointsWidget /> */}
          <MenuHeader />
        </div>
      </header>
    </>
  );
};

export default Header;
