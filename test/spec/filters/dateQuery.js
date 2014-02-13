'use strict';

describe('Filter: dateQuery', function () {

  // load the filter's module
  beforeEach(module('angularDateFiltersApp'));

  // initialize a new instance of the filter before each test
  var dateQuery;
  beforeEach(inject(function ($filter) {
    dateQuery = $filter('dateQuery');
  }));

  it('should convert a string to a moment', function(){
    var dateAsString = '15/10/1979'; // 15th October 1979
    var format = 'DD/MM/YYYY';
    var compound = dateAsString + '?' + format;
    expect(dateQuery(dateAsString,compound)).toBe(true);
  })

  it('should convert a MongoDB Date Object to a moment', function(){
  })

  it('should convert a Date Object to a moment',function(){

  })

  it('should return true when >date is before input date',function(){
      var dateAsString = '15/10/1979'; // 15th October 1979
      var laterDateAsString = '14/10/1979'; // 14th October 1979
      var format = 'DD/MM/YYYY';
      var compound = '>' + laterDateAsString + '?' + format;
      expect(dateQuery(dateAsString,compound)).toBe(true);
  })

    it('should return true when >+numperiod is used to increase time frame',function(){
        var now = moment().format();
        var nextWeek = moment().add('week',1).format();
        var nextMonth = moment().add('month',1).format();
        var compound = '>+' + nextWeek;
        expect(dateQuery(now,nextWeek)).toBe(false);
        expect(dateQuery(now,compound)).toBe(false);
        expect(dateQuery(nextMonth,compound)).toBe(true);
    })

    it('should return true when <+numperiod is used to increase time frame',function(){
        var now = moment().format();
        var nextWeek = moment().add('week',1).format();
        var compound = '<+' + nextWeek;
        expect(dateQuery(now,nextWeek)).toBe(false);
        expect(dateQuery(now,compound)).toBe(true);
    })
});