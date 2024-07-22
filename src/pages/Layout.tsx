import TopNav from '../components/common/TopNav';
import SideBar from '../components/common/SideBar';

const Layout = (props: { children: any }) => {
  return (
    <>
      <TopNav />
      <SideBar />
      <div className="content-wrapper">{props.children}</div>
    </>
  );
};

export default Layout;
