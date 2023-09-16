import LoginForm from '../components/LoginForm';

function ToolsTab({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    isLoggedIn ? (null) : (<LoginForm />)
  );
};

export default ToolsTab;
