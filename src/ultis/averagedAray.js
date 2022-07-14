const averaged = (arr) => {
    if (!arr) return;
    const avg = arr.reduce((total, curr) => {
        return total + curr;
    }, 0);
    return (avg / arr.length).toFixed(1);
};

export default averaged;
