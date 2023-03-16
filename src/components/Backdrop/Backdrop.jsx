import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "../../data/slices/settingsSlice";
import useWindowSize from "../../hooks/useWindowSize";

const Backdrop = () => {
  const { isSidebarOpen } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  if (isSidebarOpen === false || width >= 1090) return null;

  return (
    <div className='backdrop' onClick={() => dispatch(closeSidebar())}></div>
  );
};

export default Backdrop;
