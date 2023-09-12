import Wrapper from '../assets/wrappers/StatItem';

export interface StatItemParams {
  count: string | number;
  title: string;
  icon: string;
  color: string;
  bcg?: string | number;
}

const StatItem: React.FC<StatItemParams> = ({
  count,
  title,
  icon,
  color,
  bcg,
}) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
