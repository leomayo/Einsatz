import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function AvailabilityFilter({ onChange }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState();
  const [range, setRange] = useState();
  const [mode, setMode] = useState('day'); // 'day', 'range', or 'week'

  const handleNextWeekSelect = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    setRange({
      from: today,
      to: nextWeek
    });
    setMode('week');
    onChange({
      type: 'week',
      dates: {
        from: today,
        to: nextWeek
      }
    });
  };

  const handleDaySelect = (day) => {
    setSelected(day);
    setMode('day');
    onChange({
      type: 'day',
      date: day
    });
  };

  const handleRangeSelect = (dateRange) => {
    setRange(dateRange);
    setMode('range');
    if (dateRange?.from && dateRange?.to) {
      onChange({
        type: 'range',
        dates: dateRange
      });
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-white border border-gray-300 hover:bg-gray-50">
        <CalendarIcon className="h-5 w-5 text-gray-400" />
        <span>{t('filters.availability.label')}</span>
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 z-50 mt-1 bg-white rounded-md shadow-lg p-4 min-w-[320px]">
          <div className="space-y-4">
            <button
              onClick={handleNextWeekSelect}
              className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100"
            >
              {t('filters.availability.nextWeek')}
            </button>

            <div className="border-t pt-4">
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setMode('day')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    mode === 'day' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {t('filters.availability.selectDay')}
                </button>
                <button
                  onClick={() => setMode('range')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    mode === 'range' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
                  }`}
                >
                  {t('filters.availability.selectRange')}
                </button>
              </div>

              <div className="rdp-wrapper">
                <DayPicker
                  mode={mode === 'range' ? 'range' : 'single'}
                  selected={mode === 'range' ? range : selected}
                  onSelect={mode === 'range' ? handleRangeSelect : handleDaySelect}
                  numberOfMonths={1}
                  fromDate={new Date()}
                  className="border rounded-md p-2"
                />
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 