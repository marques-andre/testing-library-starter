import { render, screen } from '@testing-library/react'
import ExpandableText from '../../components/ExpandableText'
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
  const renderComponent = (text: string) => {
    render(<ExpandableText text={text}/>);
    return {
      button: screen.getByRole('button')
    }
  }

  const limit = 255;
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + '...';

  it('should show full text if less than 255 characters', () => {
    const text = 'Short one'
    render(<ExpandableText text={text}/>);

    expect(screen.getByText(text)).toBeInTheDocument();
  })
  it('should truncate if text longer than 255 characters', () => {
    const { button } = renderComponent(longText);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  })
  it('should expand text when show more button is clicked', async () => {
    const { button } = renderComponent(longText);

    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  })
  it('should collapse text when show less button is clicked', async () => {
    render(<ExpandableText text={longText}/>);
    const showMoreButton = screen.getByRole('button', { name: /more/i});
    const user = userEvent.setup();
    await user.click(showMoreButton);
    
    const showLessButton = screen.getByRole('button', { name: /less/i});
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showLessButton).toBeInTheDocument();
  })
})