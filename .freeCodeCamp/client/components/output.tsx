import { useState } from 'react';
import { ConsoleError, LoaderT, TestType } from '../types';
import { Tests } from './tests';
import { Console } from './console';
import { Hints } from './hints';
import { Progress } from './progress';

interface OutputProps {
  loader: LoaderT;
  hints: string[];
  tests: TestType[];
  cons: ConsoleError[];
}

export const Output = ({
  loader: {
    isLoading,
    progress: { total, count }
  },
  hints,
  tests,
  cons
}: OutputProps) => {
  const [selectedBtn, setSelectedBtn] = useState('tests');

  return (
    <section className='project-output'>
      <ul>
        <li>
          <button
            className='output-btn'
            disabled={selectedBtn === 'tests'}
            onClick={() => {
              setSelectedBtn('tests');
            }}
          >
            Tests
          </button>
        </li>
        <li>
          <button
            className='output-btn'
            disabled={selectedBtn === 'console'}
            onClick={() => {
              setSelectedBtn('console');
            }}
          >
            Console
          </button>
        </li>
        {hints.length ? (
          <li>
            <button
              className='output-btn'
              disabled={selectedBtn === 'hints'}
              onClick={() => {
                setSelectedBtn('hints');
              }}
            >
              Hints
            </button>
          </li>
        ) : null}
      </ul>
      {isLoading ? (
        <Progress count={count} total={total} />
      ) : (
        <div className='project-output-content'>
          {(() => {
            switch (selectedBtn) {
              case 'tests':
                return <Tests tests={tests} />;
              case 'console':
                return <Console cons={cons} />;
              case 'hints':
                return <Hints hints={hints} />;
              default:
                return <div>No content</div>;
            }
          })()}
        </div>
      )}
    </section>
  );
};
