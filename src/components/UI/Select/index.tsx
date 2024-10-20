"use client";

import { colors } from "@/styles";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 220px;
    font-size: 16px;
`;

const SelectDisplay = styled.div<{ isOpen: boolean }>`
    background-color: rgba(217, 217, 217, 0.1);
    // border: 1px solid ${({ isOpen }) => (isOpen ? "#007bff" : "#ccc")};
    border-radius: 8px;
    padding: 4px 10px;
    cursor: pointer;
    position: relative;
    color: ${colors.purple};
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        // border-color: #007bff;
    }
`;

const OptionsList = styled.ul<{ isOpen: boolean }>`
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: rgba(217, 217, 217, 0.1);
    border-radius: 8px;
    position: absolute;
    top: calc(100% + 10px);
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    z-index: 10;
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
    padding: 4px 10px;
    background-color: rgba(49, 49, 49, 1);
    color: ${({ isSelected }) => (isSelected ? "white" : colors.purple)};
    cursor: pointer;

    &:hover {
        background-color: rgba(64, 64, 64, 1);
    }
`;

const Arrow = styled.span<{ isOpen: boolean }>`
    margin-left: 10px;
    transition: transform 0.2s ease-in-out;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

type SelectOption = {
    value: string;
    label: string;
};

type CustomSelectProps = {
    options: SelectOption[];
    placeholder?: string;
    onChange: (value: string) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    placeholder = "Select an option",
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        null
    );
    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleOptionClick = (option: SelectOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option.value);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (
            selectRef.current &&
            !selectRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <SelectWrapper ref={selectRef}>
            <SelectDisplay onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                {selectedOption ? selectedOption.label : placeholder}
                <Arrow isOpen={isOpen}>▼</Arrow>
            </SelectDisplay>
            <OptionsList isOpen={isOpen}>
                {options.map((option) => (
                    <OptionItem
                        key={option.value}
                        onClick={() => handleOptionClick(option)}
                        isSelected={selectedOption?.value === option.value}
                    >
                        {option.label}
                    </OptionItem>
                ))}
            </OptionsList>
        </SelectWrapper>
    );
};

export default CustomSelect;
