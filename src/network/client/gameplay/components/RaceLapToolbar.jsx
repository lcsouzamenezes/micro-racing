import React from 'react';
import PropTypes from 'prop-types';

import * as COLORS from '@ui/colors';
import {styled} from '@pkg/fast-stylesheet/src/react';

import {useI18n} from '@ui/i18n';
import {Pull} from '@ui/basic-components/styled';

const RaceLapToolbarWrapper = styled.div(
  {
    width: '100%',
    height: 48,
    lineHeight: '48px',
    maxHeight: '100%',
    color: COLORS.WHITE,
  },
);

const CurrentLapTitle = styled.span(
  {
    fontSize: 27,
    fontWeight: 'bold',
  },
);

const CurrentLapLabel = styled.span(
  {
    marginRight: 10,
    textTransform: 'uppercase',
    fontSize: 12,
    color: COLORS.DARK_GRAY,
  },
);

const RaceLapToolbar = ({loading, lap, totalLaps}) => {
  const t = useI18n();

  return (
    <RaceLapToolbarWrapper>
      <Pull.Right>
        <CurrentLapLabel>
          {t('game.racing.current_lap')}
        </CurrentLapLabel>

        <CurrentLapTitle>
          {(
            loading
              ? '- / -'
              : `${lap} / ${totalLaps}`
          )}
        </CurrentLapTitle>
      </Pull.Right>
    </RaceLapToolbarWrapper>
  );
};

RaceLapToolbar.displayName = 'RaceLapToolbar';

RaceLapToolbar.propTypes = {
  loading: PropTypes.bool,
  totalLaps: PropTypes.number,
  lap: PropTypes.number,
};

RaceLapToolbar.defaultProps = {
  loading: false,
  totalLaps: null,
  lap: null,
};

export default RaceLapToolbar;
