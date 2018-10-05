# (Improved) Rc-Datetime-Picker

Imrc-Datetime-Picker is a react component for datetime picker by [Moment.js].

[![NPM](https://nodei.co/npm/imrc-datetime-picker.png)](https://nodei.co/npm/imrc-datetime-picker/)

Thanks to [~allenwu](https://www.npmjs.com/~allenwu) for authoring the base package [`rc-datetime-picker`](https://npmjs.com/package/rc-datetime-picker)

[**See The `ChangeLog` Here**](https://github.com/smrsan76/imrc-datetime-picker/blob/master/CHANGELOG.md)

> Note: Check the [**TODO.md**](https://github.com/smrsan76/imrc-datetime-picker/blob/master/TODO.md)
> file before usage. Maybe some features are still **buggy 💀** since the [`rc-datetime-picker`](https://npmjs.com/package/rc-datetime-picker) package
> or recently in the current package.

## Requirements

- React
- [Moment.js] or [Moment-jalaali]
- Modern browsers (IE>=9 is required)

## Installation

### Install with NPM

```
$ npm install imrc-datetime-picker
```

### Manual download

Besides npm package, UMD module and styles are placed under `dist/` directory:

- dist/imrc-datetime-picker.js
- dist/imrc-datetime-picker-min.js
- dist/imrc-datetime-picker.css
- dist/imrc-datetime-picker.min.css

## Usage

See the [demo] page.

[moment.js]: http://momentjs.com/
[moment-jalaali]: https://npmjs.com/package/moment-jalaali
[demo]: https://smrsan76.github.io/imrc-datetime-picker/

## Props

### General Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
      <th>Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>moment</td>
      <td>moment</td>
      <td></td>
      <td>Set the selected date.</td>
      <td></td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>Function(datetime: moment)</td>
      <td></td>
      <td>`onChange` will be triggered while datetime changing.</td>
      <td></td>
    </tr>
    <tr>
      <td>className</td>
      <td>String</td>
      <td></td>
      <td>Additional css class of root dom node.</td>
      <td></td>
    </tr>
    <tr>
      <td>isOpen</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the picker.</td>
      <td></td>
    </tr>
    <tr>
      <td>showCalendarPicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the calendar picker.</td>
      <td></td>
    </tr>
    <tr>
      <td>showTimePicker</td>
      <td>Boolean</td>
      <td>true</td>
      <td>Whether to show the time picker.</td>
      <td></td>
    </tr>
    <tr>
      <td>splitPanel</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Enable `split-panel` mode.</td>
      <td></td>
    </tr>
    <tr>
      <td>shortcuts</td>
      <td>Object:{name: value}</td>
      <td></td>
      <td>Add shortcuts on the top `shortcuts-bar` for selecting a date.</td>
      <td></td>
    </tr>
    <tr>
      <td>maxDate</td>
      <td>moment</td>
      <td></td>
      <td>Max Date limit.</td>
      <td></td>
    </tr>
    <tr>
      <td>minDate</td>
      <td>moment</td>
      <td></td>
      <td>Min Date limit.</td>
      <td></td>
    </tr>
    <tr>
      <td>weeks</td>
      <td>Array</td>
      <td>['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']</td>
      <td>Text for weekdays.</td>
      <td></td>
    </tr>
    <tr>
      <td>months</td>
      <td>Array</td>
      <td>[Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']</td>
      <td>Text for months.</td>
      <td></td>
    </tr>
    <tr>
      <td>dayFormat</td>
      <td>String</td>
      <td>'MMMM, YYYY'</td>
      <td>Formatting current date of the day panel.</td>
      <td></td>
    </tr>
    <tr>
      <td>minPanel</td>
      <td>String</td>
      <td>'day'</td>
      <td>Min panel for select.</td>
      <td></td>
    </tr>
    <tr>
      <td>isSolar</td>
      <td>Boolean</td>
      <td>'day'</td>
      <td>Solar date mode. Notice that you should use moment-jalaali package instead of moment.</td>
      <td>>=2.x</td>
    </tr>
    <tr>
      <td>lang</td>
      <td>String</td>
      <td>undefined (or 'en')</td>
      <td>
        Language name. ('en', 'fa') is supported.
        Notice that you should use moment-jalaali package instead of moment,
        if you want to use 'fa' language.
      </td>
      <td>>=2.x</td>
    </tr>
  </tbody>
</table>

### \*Trigger Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
      <th>Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>disabled</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Disabled triggering.</td>
      <td></td>
    </tr>
    <tr>
      <td>appendToBody</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to render the picker to `body`.</td>
      <td></td>
    </tr>
    <tr>
      <td>closeOnSelectDay</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to close the picker when selecting a date on day panel.</td>
      <td></td>
    </tr>
    <tr>
      <td>position</td>
      <td>String</td>
      <td>'bottom'</td>
      <td>
        The position of popup.
      </td>
      <td>>= v1.0.0</td>
    </tr>
  </tbody>
</table>

### \*Range Props

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
      <th>Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>format</td>
      <td>String</td>
      <td>'YYYY/MM/DD HH:mm' / 'YYYY/MM/DD'</td>
      <td>Formatting current date of each panel.</td>
      <td></td>
    </tr>
    <tr>
      <td>showCustomButton</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Whether to show the custom button.</td>
      <td></td>
    </tr>
    <tr>
      <td>customButtonText</td>
      <td>String</td>
      <td>Custom</td>
      <td>Text for custom button.</td>
      <td></td>
    </tr>
    <tr>
      <td>customRange</td>
      <td>Object: {start: moment, end: moment}</td>
      <td>Last 30 days</td>
      <td>Set the custom button value.</td>
      <td></td>
    </tr>
    <tr>
      <td>confirmButtonText</td>
      <td>String</td>
      <td>Confirm</td>
      <td>Text for confirm button.</td>
      <td></td>
    </tr>
    <tr>
      <td>startDateText</td>
      <td>String</td>
      <td>Start Date:</td>
      <td>Text for start date label.</td>
      <td></td>
    </tr>
    <tr>
      <td>endDateText</td>
      <td>String</td>
      <td>End date:</td>
      <td>Text for end date label.</td>
      <td></td>
    </tr>
    <tr>
      <td>dateLimit</td>
      <td>Object: {name: value}</td>
      <td></td>
      <td>Date range limt.</td>
      <td></td>
    </tr>
  </tbody>
</table>

## Contributing

We really appreciate your contributions.

You can follow the rules of
[**Contributing guide**](https://github.com/smrsan76/imrc-datetime-picker/blob/master/CONTRIBUTING.md)
to contribute with us.
