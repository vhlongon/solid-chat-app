type HeaderProps = {
  username: string;
  imagUrl: string;
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
          <div class="nav-start">
            <div class="flex gap-4 items-center">
              <div class="avatar avatar-ring-secondary">
                <div>
                  <img src={props.imagUrl} alt={props.username} />
                </div>
              </div>
              {props.username}
            </div>
          </div>
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
