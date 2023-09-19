import LoginForm from '../components/LoginForm';
import ToolsView from '../components/ToolsView';

function ToolsTab({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    isLoggedIn ? (
      <ToolsView />
    ) : (
      <LoginForm />
    )
  );
}

export default ToolsTab;
