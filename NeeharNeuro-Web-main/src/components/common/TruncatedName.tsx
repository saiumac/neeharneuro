import React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface TruncatedNameProps {
  name: string;
  characters: number;
}

const TruncatedName: React.FC<TruncatedNameProps> = ({ name, characters }) => {
    const shouldTruncate = name.length > characters;
    const displayText = shouldTruncate ? `${name.substring(0, characters - 3)}...` : name;

  return (
    <>
    {shouldTruncate ? (
      <Tooltip title={name} arrow>
        <span>{displayText}</span>
      </Tooltip>
        ) : (
        <span>{name}</span>
    )}
    </>
  );
};

export default TruncatedName;