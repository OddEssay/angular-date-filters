'use strict';

angular.module('angularDateFiltersApp')
  .filter('dateQuery', function () {
    return function(checkDate,rawQuery){
        function toMoment(inDate,format){

            if(format){
                return moment(inDate,format);
            }

            var outDate;
            // Detect Native Date Object
            if(Object.prototype.toString.call(inDate) === '[object Date]'){
                outDate = moment(inDate);
                // Detect Moment
            } else if (moment.isMoment(inDate)) {
                outDate = inDate;
                // Detect Unix Timestamp in Milliseconds
            } else if (typeof inDate === 'integer'){
                outDate = moment(inDate);
                // Detect MongoDB Date
            } else if (inDate.sec){
                outDate = moment(inDate.sec * 1000);
                // Try take the input and just use it as a Time String
            } else {
                outDate = moment(inDate);
            }
            return outDate;
        }

        if(!checkDate){ return false; }
        if(!rawQuery){ return false; }

        var splitQuery = rawQuery.split('?');
        var query = splitQuery[0];
        var format = splitQuery[1] || undefined;
        console.log(format)
        var mDate = toMoment(checkDate,format);

        console.log(mDate.format())
        if(query[0] === '>'){
            if(query[1] === '+') {
                var num = parseInt(query.substring(2));
                var unit = query.substring(2).replace(num,'').trim();
                return moment().add(unit,num).isBefore(mDate);
            } else if(query[1] === '-') {
                var num = parseInt(query.substring(2));
                var unit = query.substring(2).replace(num,'').trim();
                return moment().subtract(unit,num).isBefore(mDate);
            } else {
                return toMoment(query.substring(1),format).isBefore(mDate);
            }
        } else if(query[0] === '<'){
            if(query[1] === '+') {
                var num = parseInt(query.substring(2));
                var unit = query.substring(2).replace(num,'').trim();
                return moment().add(unit,num).isAfter(mDate);
            } else if(query[1] === '-') {
                var num = parseInt(query.substring(2));
                var unit = query.substring(2).replace(num,'').trim();
                return moment().subtract(unit,num).isAfter(mDate);
            } else {
                return toMoment(query.substring(1),format).isAfter(mDate);
            }
        } else {
            var split = query.split('-');
            if(split.length === 2){
                return toMoment(split[0],format).isBefore(mDate) && toMoment(split[1],format).isAfter(mDate);
            } else {
                return toMoment(query,format).isSame(mDate);
            }
        }
    }
  });
