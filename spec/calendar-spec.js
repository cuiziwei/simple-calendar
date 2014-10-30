(function() {
  describe('Simple Calendar', function() {
    var calendar;
    moment.locale('zh-cn');
    $('<div id="calendar"></div>').appendTo('body');
    calendar = simple.calendar({
      month: '2014-10',
      el: '#calendar'
    });
    it('should render calendar grid', function() {
      expect(calendar.el.hasClass('simple-calendar')).toBe(true);
      return expect(calendar.el.find('.day:not(.other-month)').length).toBe(31);
    });
    it('should render event', function() {
      calendar.addEvents([
        {
          id: 1,
          start: '2014-10-10T14:20:00',
          end: '2014-10-13T14:20:00',
          content: 'event 1'
        }, {
          id: 2,
          start: '2014-10-11T14:20:00',
          end: '2014-10-12T14:20:00',
          content: 'event 2'
        }, {
          id: 3,
          start: '2014-10-10T14:20:00',
          end: '2014-10-10T16:20:00',
          content: 'event 3'
        }, {
          id: 4,
          start: '2014-10-10T15:20:00',
          end: '2014-10-10T17:20:00',
          content: 'event 4'
        }
      ]);
      expect(calendar.el.find('.event:contains(event 1)').length).toBe(2);
      expect(calendar.el.find('.event:contains(event 2)').length).toBe(1);
      return expect(calendar.el.find('.event:contains(event 3)').length).toBe(1);
    });
    return it('should trigger click event', function() {
      var $day, $event, dayClickCallback, eventClickCallback;
      calendar.addEvent({
        id: 1,
        start: '2014-10-10T14:20:00',
        end: '2014-10-13T14:20:00',
        content: 'event 1'
      });
      dayClickCallback = jasmine.createSpy('dayClickCallback');
      eventClickCallback = jasmine.createSpy('eventClickCallback');
      calendar.on('dayclick', function(e, $day) {
        return dayClickCallback($day[0]);
      });
      calendar.on('eventclick', function(e, $event) {
        return eventClickCallback($event[0]);
      });
      expect(dayClickCallback).not.toHaveBeenCalled();
      expect(eventClickCallback).not.toHaveBeenCalled();
      $day = calendar.el.find('.day:first').click();
      $event = calendar.el.find('.event:first').click();
      expect(dayClickCallback).toHaveBeenCalledWith($day[0]);
      return expect(eventClickCallback).toHaveBeenCalledWith($event[0]);
    });
  });

}).call(this);
