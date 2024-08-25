import { render, screen } from '@testing-library/react'
import UserAccount from '../../components/UserAccount'
import { User } from '../../entities'

describe('UserAccount', () => {
  const mockUser: User = {
    id: 0,
    name: 'User name',
  }
  it('should render the user name', () => {
    render(<UserAccount user={mockUser} /> );
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  })

  it('should show the edit button if the user is an admin', () => {
    render(<UserAccount user={{...mockUser, isAdmin: true}} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  })

  it('should hide the edit button if the user is not an admin', () => {
    render(<UserAccount user={{...mockUser, isAdmin: false}} />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  })
})