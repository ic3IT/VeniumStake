export function parseIneligibility(reasons = [], quantity = 0) {
  if (!reasons || !reasons.length) {
    return '';
  }

  const reason = reasons[0];

  if (
    reason === 'Unknown' ||
    reason === 'NoActiveClaimPhase' ||
    reason === 'NoClaimConditionSet'
  ) {
    return 'This drop is not ready to be claimed.';
  } else if (reason === 'NotEnoughTokens') {
    return "You don't have enough currency to claim.";
  } else if (reason === 'AddressNotAllowed') {
    if (quantity > 1) {
      return `You are not eligible to claim ${quantity} tokens.`;
    }

    return 'You are not eligible to claim at this time.';
  }

  return reason;
}
