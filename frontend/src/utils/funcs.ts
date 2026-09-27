const artistDisplay = (artists: string[]) => {
    let result: string = "";
    for (let i = 0; i < artists.length; i++) {
      result += artists[i];
      if (i < artists.length - 1) {
        result += ", ";
      }
    }
    return result;
  };


export {artistDisplay}