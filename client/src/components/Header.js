import logo from './assets/logo.png'

function Header() {
  return (
    <div className='navbar bg-light mb-4 p-0'>
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className=".d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>Project GQL</div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Header;