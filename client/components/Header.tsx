type HeaderProps = {
  username: string;
  isLoggedIn: boolean;
};

export const Header = (props: HeaderProps) => {
  const logout = () => {
    sessionStorage.removeItem('authToken');
    window.location.reload();
  };

  return (
    <div>
      {props.isLoggedIn ? (
        <div class="navbar">
          <div class="nav-start">{props.username}</div>
          <div class="navbar-end">
            <button type="button" class="btn btn-error btn-sm" onclick={logout}>
              logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
