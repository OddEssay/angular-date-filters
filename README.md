angular-date-filters
====================

A set of filters for AngularJS filters for querying and formatting dates.

Usage
=====

Value is After the date in the filter? {{ '1979-10-15T00:00:00+01:00' | dateQuery:'>1978-01-01T00:00:00+01:00' }} // true

Value is Before the date in the filter? {{ '1979-10-15T00:00:00+01:00' | dateQuery:'<2000-01-01T00:00:00+01:00' }} // true

Value is After the date calculated by adding <int><timeperiod> {{ '2014-10-01T00:00:00+01:00' | dateQuery:'>+1week' }} // false until 8th October, where it becomes true

Value is Between two dates? {{ '2012-10-01T00:00:00+01:00' | dateQuery:'2010-10-01T00:00:00+01:00-2014-10-01T00:00:00+01:00' }} // true

Format the Input? {{ '10/11/2012' | dateQuery:'>01/02/2003?DD/MM/YYYY' }} // true
