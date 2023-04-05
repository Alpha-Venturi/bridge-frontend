const formatDateCreated = (dateCreated: string) => {
  return dateCreated.replaceAll('-', '.').replace('Z', '').replace('T', ' - ');
};

export default formatDateCreated;
