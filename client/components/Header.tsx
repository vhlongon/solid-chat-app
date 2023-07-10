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
        <div>
          user: {props.username}
          <button type="button" onclick={logout}>
            logout
          </button>
        </div>
      ) : null}
    </div>
  );
};
