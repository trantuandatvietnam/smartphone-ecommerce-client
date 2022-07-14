import React from 'react';

const Sekelaton = ({ quantity = 12 }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2rem]">
            {Array.from(Array(quantity)).map((_, index) => (
                <div key={index} className="p-6 border-[2px] rounded-[3px] shadow-2xl">
                    <div className="flex justify-center items-center mb-4">
                        <div className=" sekelaton overflow-hidden w-[17.3rem] h-[17.3rem]"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="min-h-[2rem] sekelaton"></div>
                        <div className="sekelaton"></div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="sekelaton h-8 w-8 block"></span>
                                <i className=""></i>
                            </div>
                            <div>
                                <span className="sekelaton h-8 w-[8rem] block"></span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="btn sekelaton min-w-[6rem]"></div>
                            <div className="sekelaton w-[8rem] h-[1rem]"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sekelaton;
