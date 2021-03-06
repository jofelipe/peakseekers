import React from 'react';

import { Wrapper } from './styles';

const AppStore: React.FC = (props) => {
    return (
        <Wrapper>
            <svg viewBox="0 0 24 29" fill="none" {...props}>
                <path
                    clipRule="evenodd"
                    d="M17.267 0c.251 1.707-.444 3.379-1.36 4.561-.98 1.27-2.67 2.25-4.307 2.2-.3-1.635.466-3.318 1.397-4.45C14.02 1.062 15.77.104 17.267 0zm4.918 24.022c.845-1.294 1.16-1.947 1.815-3.407-4.766-1.812-5.53-8.588-.813-11.188-1.439-1.804-3.46-2.85-5.368-2.85-1.375 0-2.317.359-3.174.685-.713.272-1.368.521-2.163.521-.86 0-1.622-.273-2.42-.559-.875-.314-1.795-.644-2.936-.644-2.141 0-4.42 1.309-5.866 3.546-2.031 3.15-1.685 9.073 1.61 14.119 1.177 1.805 2.75 3.834 4.808 3.852.854.009 1.422-.246 2.037-.522.704-.315 1.468-.659 2.793-.665 1.332-.009 2.085.339 2.78.659.598.276 1.154.533 2 .523 2.06-.016 3.72-2.265 4.897-4.07z"
                    className="theme-var-three"
                />
            </svg>
        </Wrapper>
    );
};

export default AppStore;
